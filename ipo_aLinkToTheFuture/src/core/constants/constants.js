// src/core/constants/constants.js

// ===== GAME CONFIGURATION =====
export const GAME = {
  DEBUG: false
};

// ===== TILE & COLLISION CONFIG =====
export const TILE = {
  EMPTY: 0,
  COLLISION: 95705
};

// ===== CHARACTER NPC IDs =====
export const CHARACTER_ID = {
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

// ===== BOUNDARY DIMENSIONS =====
export const BOUNDARY = {
  WIDTH: 64,
  HEIGHT: 64
};

// ===== PLAYER MOVEMENT CONFIG =====
export const MOVEMENT = {
  SPEED: 3,
  OFFSET: {
    X: -1500,  // Start near lemon bot
    Y: -1350
  }
};

// ===== CANVAS DIMENSIONS =====
export const CANVAS = {
  WIDTH: 1024,
  HEIGHT: 1000
};

// ===== DIALOGUE TREE IDENTIFIERS =====
export const DIALOGUE = {
  MAIN_MENU: 'menu',
  UNDERSTANDING: 'entender',
  WHAT_IS_IPO: 'o-que-e-um-ipo',
  PROS_CONS: 'pros-e-contras',
  INVESTMENT: 'investir',
  REGULATION: 'regulamentacao'
};

// ===== SPRITE & ANIMATION CONFIG =====
export const SPRITE = {
  // Player sprite dimensions
  PLAYER: {
    SPRITE_SHEET_WIDTH: 192,
    SPRITE_SHEET_HEIGHT: 68,
    FRAME_COUNT: 3,
    FRAME_DELAY: 10,
    SCALE: 1
  },
  
  // Character sprite configuration
  CHARACTER: {
    FRAME_COUNT: 9,
    FRAME_DELAY: 10,
    SCALE: 3
  },
  
  // NPC sprite configuration  
  NPC: {
    FRAME_COUNT: 4,
    FRAME_DELAY: 10,
    SCALE: 1
  },
  
  // Default values for Sprite class
  DEFAULTS: {
    FRAMES_MAX: 1,
    FRAMES_HOLD: 10,
    FRAMES_VAL: 0,
    FRAMES_ELAPSED: 0,
    OPACITY: 1,
    ROTATION: 0,
    SCALE: 1,
    ANIMATE: false
  }
};

// ===== SPRITE DRAWING CONFIG =====
export const SPRITE_DRAW = {
  CENTER_DIVISOR: 2,     // Para this.width / 2
  CROP_POSITION_Y: 0,    // y: 0 no crop
  FRAME_INDEX_OFFSET: 1  // Para this.frames.max - 1
};

// ===== PLAYER POSITIONING =====
export const PLAYER = {
  INITIAL_POSITION: {
    X: CANVAS.WIDTH / 2 - SPRITE.PLAYER.SPRITE_SHEET_WIDTH / 4 / 2,
    Y: CANVAS.HEIGHT / 2 - SPRITE.PLAYER.SPRITE_SHEET_HEIGHT / 2
  }
};

// ===== COLLISION DETECTION =====
export const COLLISION = {
  DEFAULT_OFFSET: { X: 0, Y: 0 }
};

// ===== DIALOGUE SYSTEM =====
export const DIALOGUE_CONFIG = {
  TYPING_DELAY: 300,        // ms for typing animation
  END_CONVERSATION_DELAY: 1500, // ms before closing dialogue
  BUBBLE_APPEAR_DELAY: 300  // ms for answer bubbles to appear
};

// ===== ARRAY CONFIGURATION =====
export const ARRAY = {
  COLLISION_MAP_CHUNK_SIZE: 100,
  CHARACTER_MAP_CHUNK_SIZE: 100
};

// ===== DIRECTIONAL CONSTANTS =====
export const DIRECTION = {
  UP: 'up',
  DOWN: 'down', 
  LEFT: 'left',
  RIGHT: 'right',
  NONE: 'none'
};

// ===== INPUT CONFIGURATION =====
export const INPUT = {
  KEYS: {
    W: 'w',
    A: 'a',
    S: 's', 
    D: 'd',
    SPACE: ' ',
    QUIT: 'quit'
  }
};

// ===== SPRITE IMAGES =====
// Sprite variables (deve ser carregado após o constants.js)
export const bobSprite = new Image();
bobSprite.src = "../../../assets/img/characters/Bob_phone_16x16.png";

export const ameliaSprite = new Image();
ameliaSprite.src = "../../../assets/img/characters/Amelia_phone_16x16.png";

export const backgroundImage = new Image();
backgroundImage.src = "../../../assets/img/city/city.png";

export const foregroundImg = new Image();
foregroundImg.src = "../../../assets/img/city/cityForeground.png";

export const playerDownSprite = new Image();
playerDownSprite.src = "../../../assets/img/player/playerDown.png";

export const playerUpSprite = new Image();
playerUpSprite.src = "../../../assets/img/player/playerUp.png";

export const playerLeftSprite = new Image();
playerLeftSprite.src = "../../../assets/img/player/payerLeft.png";

export const playerRightSprite = new Image();
playerRightSprite.src = "../../../assets/img/player/playerRight.png";