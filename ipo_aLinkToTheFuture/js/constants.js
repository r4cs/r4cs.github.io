// Collision Tile IDs
const TILE = {
  EMPTY: 0,
  COLLISION: 95705
};

// Character NPC IDs
const CHARACTER = {
  NONE: 0,
  BOB: 87906,
  AMELIA: {
    BASE: 87904,
    VARIANT_1: 87905,
    VARIANT_2: 87907, 
    VARIANT_3: 87908,
    VARIANT_4: 87909
  }
};

// Boundary dimensions
const BOUNDARY = {
  WIDTH: 64,
  HEIGHT: 64
};

// Player movement
const MOVEMENT = {
  SPEED: 3,
  OFFSET: {
    // X: -4000, // começa perto do bot da praia
	// Y: -1600
    X: -1500,  // comeca perto do bot dos limoes    
    Y: -1350
  }
};

// Game canvas dimensions
const CANVAS = {
  WIDTH: 1024,
  HEIGHT: 1000
};

// Dialogue tree identifiers
const DIALOGUE = {
  MAIN_MENU: 'menu',
  UNDERSTANDING: 'entender',
  WHAT_IS_IPO: 'o-que-e-um-ipo',
  PROS_CONS: 'pros-e-contras',
  INVESTMENT: 'investir',
  REGULATION: 'regulamentacao'
};