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
for (let i=0; i<collisions.length; i+=100) {
    collisionsMap.push(collisions.slice(i, 100+i));
}

// Tornar charactersMap global para acesso do CollisionDetector
const charactersMap = [];
for (let i = 0; i < charactersMapData.length; i += 100) {
  charactersMap.push(charactersMapData.slice(i, 100 + i));
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
    if (symbol === Constants.CHARACTER.BOB) {
      characters.push(
        new Character({
          name: 'bob',
          position: {
            x: j * Constants.BOUNDARY.WIDTH + offset.x,
            y: i * Constants.BOUNDARY.HEIGHT + offset.y
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
    
    if (symbol === Constants.CHARACTER.AMELIA.BASE || 
        symbol === Constants.CHARACTER.AMELIA.VARIANT_1 || 
        symbol === Constants.CHARACTER.AMELIA.VARIANT_2 || 
        symbol === Constants.CHARACTER.AMELIA.VARIANT_3 || 
        symbol === Constants.CHARACTER.AMELIA.VARIANT_4) {
      characters.push(
        new Character({
          name: 'amelia',
          position: {
            x: j * Constants.BOUNDARY.WIDTH + offset.x,
            y: i * Constants.BOUNDARY.HEIGHT + offset.y
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
    x: Constants.CANVAS.WIDTH / 2 - 192 / 4 / 2,
    y: Constants.CANVAS.HEIGHT / 2 - 68 / 2
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
	...characters.filter(character => character != Constants.CHARACTER.AMELIA.BASE),
	player,
	foreground];

  function animate() {
  const animationId = requestAnimationFrame(animate)
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
      characterOffset: { x: 0, y: Constants.MOVEMENT.SPEED }
    });

    moving = !CollisionDetector.checkBoundaryCollision(
      player, boundaries, 0, Constants.MOVEMENT.SPEED
    );

    if (moving) {
      movables.forEach((movable) => {
        movable.position.y += Constants.MOVEMENT.SPEED;
      });
    }
  } else if (keys.a.pressed && lastKey === 'a') {
    player.animate = true
    player.image = player.sprites.left

    CollisionDetector.checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: Constants.MOVEMENT.SPEED, y: 0 }
    });

    moving = !CollisionDetector.checkBoundaryCollision(
      player, boundaries, Constants.MOVEMENT.SPEED, 0
    );

    if (moving) {
      movables.forEach((movable) => {
        movable.position.x += Constants.MOVEMENT.SPEED;
      });
    }
  } else if (keys.s.pressed && lastKey === 's') {
    player.animate = true
    player.image = player.sprites.down

    CollisionDetector.checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -Constants.MOVEMENT.SPEED }
    });

    moving = !CollisionDetector.checkBoundaryCollision(
      player, boundaries, 0, -Constants.MOVEMENT.SPEED
    );

    if (moving) {
      movables.forEach((movable) => {
        movable.position.y -= Constants.MOVEMENT.SPEED;
      });
    }
  } else if (keys.d.pressed && lastKey === 'd') {
    player.animate = true
    player.image = player.sprites.right

    CollisionDetector.checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -Constants.MOVEMENT.SPEED, y: 0 }
    });

    moving = !CollisionDetector.checkBoundaryCollision(
      player, boundaries, -Constants.MOVEMENT.SPEED, 0
    );

    if (moving) {
      movables.forEach((movable) => {
        movable.position.x -= Constants.MOVEMENT.SPEED;
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
const initGameLegacy = initGame;
