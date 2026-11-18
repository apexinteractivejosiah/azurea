import test from 'node:test';
import assert from 'node:assert/strict';
import {
  REAL_PROPERTY_PHOTOS,
  createInitialResortState,
  calculateOwnerFinancials,
  createSuiteReservation,
  toggleUnitOwnership,
  advanceBookingStatus,
  getTowerLeaderboard,
  getUnitsForTowerFloor,
} from './resortEngine';

test('6-tower resort initialization maintains exact 1,000 units per tower (6,000 total) and uses all 20 real uploaded property photos', () => {
  const state = createInitialResortState();
  assert.equal(state.towers.length, 6);
  assert.equal(REAL_PROPERTY_PHOTOS.length, 20);

  const totalUnits = state.towers.reduce((acc, t) => acc + t.totalUnits, 0);
  assert.equal(totalUnits, 6000);

  for (const tower of state.towers) {
    assert.equal(tower.totalUnits, 1000);
    assert.equal(tower.ownedUnits + tower.availableUnits, 1000);
    assert.ok(tower.imageUrl.startsWith('/assets/aistudio/'));
    assert.ok(tower.skyMap.wingName.length > 0);
  }

  for (const photo of REAL_PROPERTY_PHOTOS) {
    assert.ok(photo.src.startsWith('/assets/aistudio/'));
  }
});

test('getUnitsForTowerFloor generates 12 selectable units for any tower T1-T6 and any floor 1-62', () => {
  const state = createInitialResortState();
  const t5Floor28 = getUnitsForTowerFloor('T5', 28, state.reservations, state.owners);
  assert.equal(t5Floor28.length, 12);
  assert.equal(t5Floor28[0].unitNumber, '#T5-2801');
  assert.equal(t5Floor28[11].unitNumber, '#T5-2812');
  assert.equal(t5Floor28[0].tierId, 'tier-terrace');
});

test('suite reservation syncs Tower revenue, booking count, and Condo Owner #OWN-T1-804 payout ledger', () => {
  const initialState = createInitialResortState();
  const t1Before = initialState.towers.find((t) => t.id === 'T1')!;
  const ownerBefore = initialState.owners.find((o) => o.ownerId === '#OWN-T1-804')!;

  const { nextState, createdReservation, syncedOwnerId } = createSuiteReservation(initialState, {
    guestName: 'Lord Sebastian Sterling',
    guestEmail: 'sebastian@sterling.co.uk',
    towerId: 'T1',
    floorTierId: 'tier-terrace',
    unitNumber: '#T1-804',
    preferredView: 'Direct Beachfront View',
    guestPartySize: '4 Guests (2-Bed Ocean Suite)',
    checkIn: '2026-12-01',
    checkOut: '2026-12-06',
  });

  assert.equal(syncedOwnerId, '#OWN-T1-804');
  assert.equal(createdReservation.nights, 5);
  assert.ok(createdReservation.bookingRef.startsWith('AZR-'));
  assert.ok(createdReservation.suitePhotoUrl.startsWith('/assets/aistudio/'));

  const t1After = nextState.towers.find((t) => t.id === 'T1')!;
  assert.equal(t1After.totalBookingsCount, t1Before.totalBookingsCount + 1);
  assert.equal(t1After.monthlyGrossRevenue, t1Before.monthlyGrossRevenue + createdReservation.totalPrice);

  const ownerAfter = nextState.owners.find((o) => o.ownerId === '#OWN-T1-804')!;
  assert.equal(ownerAfter.monthlyGrossRevenue, ownerBefore.monthlyGrossRevenue + createdReservation.totalPrice);
  assert.equal(ownerAfter.activeBookingAlert.bookingRef, createdReservation.bookingRef);
  assert.equal(ownerAfter.stays[0].bookingRef, createdReservation.bookingRef);

  const financials = calculateOwnerFinancials(createdReservation.totalPrice, 0.15);
  assert.equal(ownerAfter.stays[0].managementFee, financials.managementFee);
  assert.equal(ownerAfter.stays[0].netPayout, financials.netOwnerPayout);
});

test('toggling unit ownership preserves 1,000 unit invariant per tower and updates owned/available counts', () => {
  const initialState = createInitialResortState();
  const t1Before = initialState.towers.find((t) => t.id === 'T1')!;

  const afterToggleToOwned = toggleUnitOwnership(
    initialState,
    'T1',
    '#T1-108',
    'Duchess Sofia Conti',
    '#OWN-T1-108'
  );
  const t1Mid = afterToggleToOwned.towers.find((t) => t.id === 'T1')!;
  const unitMid = afterToggleToOwned.unitRegistry.find((u) => u.displayUnitNumber === '#T1-108')!;

  assert.equal(unitMid.ownershipStatus, 'Privately Owned');
  assert.equal(unitMid.ownerId, '#OWN-T1-108');
  assert.equal(t1Mid.ownedUnits, t1Before.ownedUnits + 1);
  assert.equal(t1Mid.availableUnits, t1Before.availableUnits - 1);
  assert.equal(t1Mid.ownedUnits + t1Mid.availableUnits, 1000);
});

test('check-in stage progression and leaderboard calculation work deterministically across 6 towers', () => {
  const state = createInitialResortState();
  const next = advanceBookingStatus(state, 'AZR-7420');
  const updatedBooking = next.reservations.find((r) => r.bookingRef === 'AZR-7420')!;
  assert.equal(updatedBooking.status, 'Digital Keycard Active');

  const leaderboard = getTowerLeaderboard(state.towers);
  assert.equal(leaderboard.highestRevenueTower.id, 'T4');
  assert.equal(leaderboard.totalOwnedUnits + leaderboard.totalAvailableUnits, 6000);
});
