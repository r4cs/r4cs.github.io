console.log("Rodando The Legend of IPO - A link to the future");

import { 
  TILE, CHARACTER, BOUNDARY, MOVEMENT, CANVAS,
  bobSprite, ameliaSprite, backgroundImage, foregroundImg,
  playerDownSprite, playerUpSprite, playerLeftSprite, playerRightSprite
} from './constants/constants.js';

// 2. Import data
import {collisions} from '../../assets/data/collisions.js';
import { mainMenuDialogue } from '../../assets/data/dialogos.js';
import {charactersMapData} from '../../assets/data/characters.js';

// 3. Import classes
import { canvas, setupCanvas } from './canvas.js';
import { Boundary } from './classes/boundary.js';
import { Sprite } from './classes/sprite.js';
import { Character } from './classes/characters.js';
import { Dialogo } from './classes/dialogo.js';
import { InputHandler } from './input-handler.js';
import { CollisionDetector } from './collision-detector.js';
import { DialogManager } from '../ui/dialog-manager.js';


window.TILE = TILE;
window.CHARACTER = CHARACTER;
window.collisions = collisions;
window.charactersMapData = charactersMapData;
window.mainMenuDialogue = mainMenuDialogue;
window.Boundary = Boundary;
window.Sprite = Sprite;

console.log("📦 All dependencies loaded for migration");

setupCanvas(CANVAS.WIDTH, CANVAS.HEIGHT);

const inputHandler = new InputHandler();
const collisionDetector = new CollisionDetector();
// inclusao do dialogManager
window.dialogManager = new DialogManager();

// Tornar offset global para acesso do CollisionDetector
window.offset = {
  x: MOVEMENT.OFFSET.X,
  y: MOVEMENT.OFFSET.Y
};

const collisionsMap = [];
for (let i=0; i<collisions.length; i+=100) {
    collisionsMap.push(collisions.slice(i, 100+i));
}

// Tornar charactersMap global para acesso do CollisionDetector
window.charactersMap = [];
for (let i = 0; i < charactersMapData.length; i += 100) {
  window.charactersMap.push(charactersMapData.slice(i, 100 + i));
}

const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === TILE.COLLISION) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * BOUNDARY.WIDTH + window.offset.x,
                        y: i * BOUNDARY.HEIGHT + window.offset.y
                    }
                })
            );
        }
    });
});


const characters = [];
const bot = bobSprite;
const amelia = ameliaSprite;
  
window.charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === CHARACTER.BOB) {
      characters.push(
        new Character({
          name: 'bob',
          position: {
            x: j * BOUNDARY.WIDTH + window.offset.x,
            y: i * BOUNDARY.HEIGHT + window.offset.y
          },
          image: bot,          
          frames: {
            max: 9, // quantidade de frames
            hold: 10 // 60 // tempo troca frames
          },
          scale: 3, // tamanho
          animate: true,
          dialogue: null
        })
      )
    }
    
    if (symbol === CHARACTER.AMELIA.BASE || 
        symbol === CHARACTER.AMELIA.VARIANT_1 || 
        symbol === CHARACTER.AMELIA.VARIANT_2 || 
        symbol === CHARACTER.AMELIA.VARIANT_3 || 
        symbol === CHARACTER.AMELIA.VARIANT_4) {
      characters.push(
        new Character({
          name: 'amelia',
          position: {
            x: j * BOUNDARY.WIDTH + window.offset.x,
            y: i * BOUNDARY.HEIGHT + window.offset.y
          },
          image: amelia,
          frames: {
            max: 9, // quantidade de frames
            hold: 10 // 60 // tempo troca frames
          },
          scale: 3, // tamanho
          animate: true,
          dialogue: ['...', 'Perdi tudinho...']
        })
      )
    }
    if (symbol !== TILE.EMPTY) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * BOUNDARY.WIDTH + window.offset.x,
            y: i * BOUNDARY.HEIGHT + window.offset.y
          }
        })
      )
    }
  })
})


const image = backgroundImage;
const foregroundImage = foregroundImg;

const playerDownImage = playerDownSprite;
const playerUpImage = playerUpSprite;
const playerLeftImage = playerLeftSprite;
const playerRightImage = playerRightSprite;

// const player comentado para dialogMngr
// const player = new Sprite({
window.player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 3,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  },
})


const background = new Sprite({
    position: {
        x: window.offset.x,
        y: window.offset.y
    },
    image: image
});


const foreground = new Sprite({
    position: {
        x: window.offset.x,
        y: window.offset.y
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
	...characters.filter(character => character != CHARACTER.AMELIA.BASE),
	player,
	foreground];

  function animate() {
  const animationId = window.requestAnimationFrame(animate)
  renderables.forEach((renderable) => {
    renderable.draw()
  })

  let moving = true
  player.animate = false
  
  const keys = inputHandler.getKeys();
  const lastKey = inputHandler.getLastKey();
  
  if (keys.w.pressed && lastKey === 'w') {
    player.animate = true
    player.image = player.sprites.up

    CollisionDetector.checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: MOVEMENT.SPEED }
    });

    moving = !CollisionDetector.checkBoundaryCollision(
      player, boundaries, 0, MOVEMENT.SPEED
    );

    if (moving) {
      movables.forEach((movable) => {
        movable.position.y += MOVEMENT.SPEED;
      });
    }
  } else if (keys.a.pressed && lastKey === 'a') {
    player.animate = true
    player.image = player.sprites.left

    CollisionDetector.checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: MOVEMENT.SPEED, y: 0 }
    });

    moving = !CollisionDetector.checkBoundaryCollision(
      player, boundaries, MOVEMENT.SPEED, 0
    );

    if (moving) {
      movables.forEach((movable) => {
        movable.position.x += MOVEMENT.SPEED;
      });
    }
  } else if (keys.s.pressed && lastKey === 's') {
    player.animate = true
    player.image = player.sprites.down

    CollisionDetector.checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -MOVEMENT.SPEED }
    });

    moving = !CollisionDetector.checkBoundaryCollision(
      player, boundaries, 0, -MOVEMENT.SPEED
    );

    if (moving) {
      movables.forEach((movable) => {
        movable.position.y -= MOVEMENT.SPEED;
      });
    }
  } else if (keys.d.pressed && lastKey === 'd') {
    player.animate = true
    player.image = player.sprites.right

    CollisionDetector.checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -MOVEMENT.SPEED, y: 0 }
    });

    moving = !CollisionDetector.checkBoundaryCollision(
      player, boundaries, -MOVEMENT.SPEED, 0
    );

    if (moving) {
      movables.forEach((movable) => {
        movable.position.x -= MOVEMENT.SPEED;
      });
    }
  }
}

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
window.initGameLegacy = initGame;
