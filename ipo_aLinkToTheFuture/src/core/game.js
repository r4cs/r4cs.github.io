console.log("Rodando The Legend of IPO - A link to the future");

import * as Constants from './constants/index.js';
import { setupCanvas } from './canvas.js';
import {collisions} from '../../assets/data/collisions.js';
import {charactersMapData} from '../../assets/data/characters.js';
import { Boundary, Sprite, Character, Dialogo } from './classes/index.js';
import { InputHandler, CollisionDetector } from './managers/index.js';
import { mainMenuDialogue } from '../../assets/data/dialogos.js';
import { DialogManager } from '../ui/dialog-manager.js';

console.log("📦 All dependencies loaded for migration");

setupCanvas(Constants.CANVAS.WIDTH, Constants.CANVAS.HEIGHT);

const inputHandler = new InputHandler();
const collisionDetector = new CollisionDetector();
// const dialogManager = new DialogManager();

// Tornar offset global para acesso do CollisionDetector
const offset = {
  x: Constants.MOVEMENT.OFFSET.X,
  y: Constants.MOVEMENT.OFFSET.Y
};

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += Constants.ARRAY.COLLISION_MAP_CHUNK_SIZE) {
    collisionsMap.push(collisions.slice(i, Constants.ARRAY.COLLISION_MAP_CHUNK_SIZE + i));
}

// Tornar charactersMap global para acesso do CollisionDetector
const charactersMap = [];
for (let i = 0; i < charactersMapData.length; i += Constants.ARRAY.CHARACTER_MAP_CHUNK_SIZE) {
  charactersMap.push(charactersMapData.slice(i, Constants.ARRAY.CHARACTER_MAP_CHUNK_SIZE + i));
}

const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === Constants.TILE.COLLISION) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Constants.BOUNDARY.WIDTH + offset.x,
                        y: i * Constants.BOUNDARY.HEIGHT + offset.y
                    }
                })
            );
        }
    });
});


const characters = [];
const bot = Constants.bobSprite;
const amelia = Constants.ameliaSprite;
  
charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === Constants.CHARACTER_ID.BOB) {
      characters.push(
        new Character({
          name: 'bob',
          position: {
            x: j * Constants.BOUNDARY.WIDTH + offset.x,
            y: i * Constants.BOUNDARY.HEIGHT + offset.y
          },
          image: bot,          
          frames: {
            max: Constants.SPRITE.CHARACTER.FRAME_COUNT, // quantidade de frames
            hold: Constants.SPRITE.CHARACTER.FRAME_DELAY // tempo troca frames
          },
          scale: Constants.SPRITE.CHARACTER.SCALE, // tamanho
          animate: true,
          dialogue: null
        })
      )
    }
    
    if (symbol === Constants.CHARACTER_ID.AMELIA.BASE || 
        symbol === Constants.CHARACTER_ID.AMELIA.VARIANT_1 || 
        symbol === Constants.CHARACTER_ID.AMELIA.VARIANT_2 || 
        symbol === Constants.CHARACTER_ID.AMELIA.VARIANT_3 || 
        symbol === Constants.CHARACTER_ID.AMELIA.VARIANT_4) {
      characters.push(
        new Character({
          name: 'amelia',
          position: {
            x: j * Constants.BOUNDARY.WIDTH + offset.x,
            y: i * Constants.BOUNDARY.HEIGHT + offset.y
          },
          image: amelia,
          frames: {
            max: Constants.SPRITE.CHARACTER.FRAME_COUNT,
            hold: Constants.SPRITE.CHARACTER.FRAME_DELAY
          },
          scale: Constants.SPRITE.CHARACTER.SCALE, // tamanho
          animate: true,
          dialogue: ['...', 'Perdi tudinho...']
        })
      )
    }
    if (symbol !== Constants.TILE.EMPTY) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Constants.BOUNDARY.WIDTH + offset.x,
            y: i * Constants.BOUNDARY.HEIGHT + offset.y
          }
        })
      )
    }
  })
})


const image = Constants.backgroundImage;
const foregroundImage = Constants.foregroundImg;

const playerDownImage = Constants.playerDownSprite;
const playerUpImage = Constants.playerUpSprite;
const playerLeftImage = Constants.playerLeftSprite;
const playerRightImage = Constants.playerRightSprite;

const player = new Sprite({
  position: {
    x: Constants.PLAYER.INITIAL_POSITION.X,
    y: Constants.PLAYER.INITIAL_POSITION.Y
  },
  image: playerDownImage,
  frames: {
    max: Constants.SPRITE.PLAYER.FRAME_COUNT,
    hold: Constants.SPRITE.PLAYER.FRAME_DELAY
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  },
})

const dialogManager = new DialogManager();
dialogManager.setPlayer(player);  // ← Injeta o player


const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});


const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

const movables = [
	background, 
	...boundaries, 
	foreground, 
	...characters];

const renderables = [
	background, 
	...boundaries, 
	...characters.filter(character => character != Constants.CHARACTER_ID.AMELIA.BASE),
	player,
	foreground];

function animate() {
  const animationId = requestAnimationFrame(animate);
  renderScene();
  updateGameState();
}

// ✅ RENDERIZAÇÃO DA CENA
function renderScene() {
  renderables.forEach(renderable => renderable.draw());
}

// ✅ ATUALIZAÇÃO DO ESTADO DO JOGO
function updateGameState() {
  handlePlayerMovement();
  // checkCollisions();
  // updateAnimations();
}

// ✅ CONTROLE DE MOVIMENTO DO PLAYER
function handlePlayerMovement() {
  const keys = inputHandler.getKeys();
  const lastKey = inputHandler.getLastKey();
  
  let moving = true;
  player.animate = false;

  if (keys.w.pressed && lastKey === 'w') {
    moving = handleMoveUp();
  } else if (keys.a.pressed && lastKey === 'a') {
    moving = handleMoveLeft();
  } else if (keys.s.pressed && lastKey === 's') {
    moving = handleMoveDown();
  } else if (keys.d.pressed && lastKey === 'd') {
    moving = handleMoveRight();
  }

  return moving;
}

// ✅ MOVIMENTO PARA CIMA
function handleMoveUp() {
  player.animate = true;
  player.image = player.sprites.up;

  CollisionDetector.checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: Constants.MOVEMENT.SPEED }
  });

  const moving = !CollisionDetector.checkBoundaryCollision(
    player, boundaries, 0, Constants.MOVEMENT.SPEED
  );

  if (moving) {
    movables.forEach(movable => movable.position.y += Constants.MOVEMENT.SPEED);
  }

  return moving;
}

// ✅ MOVIMENTO PARA ESQUERDA
function handleMoveLeft() {
  player.animate = true;
  player.image = player.sprites.left;

  CollisionDetector.checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: Constants.MOVEMENT.SPEED, y: 0 }
  });

  const moving = !CollisionDetector.checkBoundaryCollision(
    player, boundaries, Constants.MOVEMENT.SPEED, 0
  );

  if (moving) {
    movables.forEach(movable => movable.position.x += Constants.MOVEMENT.SPEED);
  }

  return moving;
}

// ✅ MOVIMENTO PARA BAIXO
function handleMoveDown() {
  player.animate = true;
  player.image = player.sprites.down;

  CollisionDetector.checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: -Constants.MOVEMENT.SPEED }
  });

  const moving = !CollisionDetector.checkBoundaryCollision(
    player, boundaries, 0, -Constants.MOVEMENT.SPEED
  );

  if (moving) {
    movables.forEach(movable => movable.position.y -= Constants.MOVEMENT.SPEED);
  }

  return moving;
}

// ✅ MOVIMENTO PARA DIREITA
function handleMoveRight() {
  player.animate = true;
  player.image = player.sprites.right;

  CollisionDetector.checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: -Constants.MOVEMENT.SPEED, y: 0 }
  });

  const moving = !CollisionDetector.checkBoundaryCollision(
    player, boundaries, -Constants.MOVEMENT.SPEED, 0
  );

  if (moving) {
    movables.forEach(movable => movable.position.x -= Constants.MOVEMENT.SPEED);
  }

  return moving;
}

// ✅ VERIFICAÇÃO DE COLISÕES
// function checkCollisions() {
  // Colisões já são tratadas nas funções de movimento
  // Esta função pode ser expandida para outras colisões no futuro
// }

// ✅ ATUALIZAÇÃO DE ANIMAÇÕES
// function updateAnimations() {
  // Animations são atualizadas automaticamente nos sprites
  // Esta função pode ser usada para animações especiais
// }


  // rmeovido temporariamente para destrincher animate
//   function animate() {
//     const animationId = requestAnimationFrame(animate)
//     renderables.forEach((renderable) => {
//       renderable.draw()
//     })

//     let moving = true
//     player.animate = false
    
//     const keys = inputHandler.getKeys();
//     const lastKey = inputHandler.getLastKey();
    
//     if (keys.w.pressed && lastKey === Constants.INPUT.KEYS.W) {
//       player.animate = true
//       player.image = player.sprites.up

//       CollisionDetector.checkForCharacterCollision({
//         characters,
//         player,
//         characterOffset: { x: 0, y: Constants.MOVEMENT.SPEED }
//       });

//       moving = !CollisionDetector.checkBoundaryCollision(
//         player, boundaries, 0, Constants.MOVEMENT.SPEED
//       );

//       if (moving) {
//         movables.forEach((movable) => {
//           movable.position.y += Constants.MOVEMENT.SPEED;
//         });
//       }
//     } else if (keys.a.pressed && lastKey === Constants.INPUT.KEYS.A) {
//       player.animate = true
//       player.image = player.sprites.left

//       CollisionDetector.checkForCharacterCollision({
//         characters,
//         player,
//         characterOffset: { x: Constants.MOVEMENT.SPEED, y: 0 }
//       });

//       moving = !CollisionDetector.checkBoundaryCollision(
//         player, boundaries, Constants.MOVEMENT.SPEED, 0
//       );

//       if (moving) {
//         movables.forEach((movable) => {
//           movable.position.x += Constants.MOVEMENT.SPEED;
//         });
//       }
//     } else if (keys.s.pressed && lastKey === 's') {
//       player.animate = true
//       player.image = player.sprites.down

//       CollisionDetector.checkForCharacterCollision({
//         characters,
//         player,
//         characterOffset: { x: 0, y: -Constants.MOVEMENT.SPEED}
//       });

//       moving = !CollisionDetector.checkBoundaryCollision(
//         player, boundaries, 0, -Constants.MOVEMENT.SPEED
//       );

//       if (moving) {
//         movables.forEach((movable) => {
//           movable.position.y -= Constants.MOVEMENT.SPEED;
//         });
//       }
//     } else if (keys.d.pressed && lastKey === Constants.INPUT.KEYS.D) {
//       player.animate = true
//       player.image = player.sprites.right

//       CollisionDetector.checkForCharacterCollision({
//         characters,
//         player,
//         characterOffset: { x: -Constants.MOVEMENT.SPEED, y: 0 }
//       });

//       moving = !CollisionDetector.checkBoundaryCollision(
//         player, boundaries, -Constants.MOVEMENT.SPEED, 0
//       );

//       if (moving) {
//         movables.forEach((movable) => {
//           movable.position.x -= Constants.MOVEMENT.SPEED;
//         });
//       }
//     }
// }

// === EXPORT PARA MIGRAÇÃO GRADUAL === //
export function initGame() {
  console.log("🎮 Initializing game from game.js...");
  
  // Chamar a função animate() que já existe
  animate();
  
  // Inicializar diálogo (já existente)
  const dialogo = new Dialogo(mainMenuDialogue);
  dialogo.initDialog();
}

// Tornar função global temporariamente para acesso
const initGameLegacy = initGame;
