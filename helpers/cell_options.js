// Consts to define the possible cell types

// Safe for walking
const STREET = 'street';

// Don't fall in!
const PIT = 'pit';

// Don't get lost in the woods!
const TREE = 'tree';

const STATE_PAUSED = 'paused';
const STATE_RUNNING = 'running';
const STATE_GHOSTED = 'ghosted';
const STATE_LOST = 'lost';
const STATE_PIT = 'fell in pit';

/**
 * 
 * brainstorm options:
 * 
 * ok, so we want to have "ghost" houses and "candy" houses
 * 
 * What do the arrays contain?
 * 
 * let leftHouseMap = ['candy', 'ghost', 'candy', 'candy'];
 * let rightHouseMap = ['pit', 'candy', 'candy']
 * 
 * What are useful things about arrays?
    * working with the length of the array
    * checking array elements
 * 
 * prevHouse() - walk back one "house" down the street
 * nextHouse() - walk down one "house" down the street?
 * crossStreet() - walk across the street?
 * 
 * crossLeft() / crossRight()
 * knockAtDoor()
 * 
 * Step 0: 3 houses, first one haunted, 2nd two are candy
 * Step 1: 3 houses, random one haunted
 * Step 2: Between 3 and 5 houses, random 2 haunted
 * Step 3: Both sides of street, street is same length (no pits)
 * Step 4: Pits
 * 
 */


