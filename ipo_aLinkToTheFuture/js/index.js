console.log("Rodando The Legend of IPO - A link to the future");

const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");


canvas.width = CANVAS.WIDTH;
canvas.height = CANVAS.HEIGHT;


const collisionsMap = [];
for (let i=0; i<collisions.length; i+=100) {
    collisionsMap.push(collisions.slice(i, 100+i));
}

const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 100) {
  charactersMap.push(charactersMapData.slice(i, 100 + i))
}
console.log(charactersMap)


const boundaries = [];
const offset = {
  x: MOVEMENT.OFFSET.X,
  y: MOVEMENT.OFFSET.Y
};

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === TILE.COLLISION) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * BOUNDARY.WIDTH + offset.x,
                        y: i * BOUNDARY.HEIGHT + offset.y
                    }
                })
            );
        }
    });
});


const characters = [];

const bot = bobSprite;
const amelia = ameliaSprite;

  
charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === CHARACTER.BOB) {
      characters.push(
        new Character({
          name: 'bob',
          position: {
            x: j * BOUNDARY.WIDTH + offset.x,
            y: i * BOUNDARY.HEIGHT + offset.y
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
            x: j * BOUNDARY.WIDTH + offset.x,
            y: i * BOUNDARY.HEIGHT + offset.y
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
            x: j * BOUNDARY.WIDTH + offset.x,
            y: i * BOUNDARY.HEIGHT + offset.y
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


const player = new Sprite({
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



const keys = keyboardState;

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
  
    if (keys.w.pressed && lastKey === 'w') {
    player.animate = true
    player.image = player.sprites.up

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: MOVEMENT.SPEED }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + MOVEMENT.SPEED
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += MOVEMENT.SPEED
      })
  } else if (keys.a.pressed && lastKey === 'a') {
    player.animate = true
    player.image = player.sprites.left

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: MOVEMENT.SPEED, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + MOVEMENT.SPEED,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += MOVEMENT.SPEED
      })
  } else if (keys.s.pressed && lastKey === 's') {
    player.animate = true
    player.image = player.sprites.down

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -MOVEMENT.SPEED }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - MOVEMENT.SPEED
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= MOVEMENT.SPEED
      })
  } else if (keys.d.pressed && lastKey === 'd') {
    player.animate = true
    player.image = player.sprites.right

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -MOVEMENT.SPEED, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - MOVEMENT.SPEED,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= MOVEMENT.SPEED
      })
  }
}

animate();

// Adicione um objeto para mapear as teclas correspondentes aos botões
const buttonMappings = {
    'arrow-top': 'w',
    'arrow-left': 'a',
    'arrow-bottom': 's',
    'arrow-right': 'd',
    'button-a': ' ',
    'button-b': 'quit'
};

// Função para processar eventos de clique nos botões
function handleButtonClick(button) {
    const key = buttonMappings[button];
    if (key) {
        simulateKeyPress(key);
    }
}

// Adicione eventos de clique para os botões
const buttonElements = document.querySelectorAll('.directions button, .buttons button');
buttonElements.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.classList[0]));
});

// Função para simular pressionamento de tecla
function simulateKeyPress(key) {
    const event = new KeyboardEvent('keydown', { key: key });
    window.dispatchEvent(event);
}

let lastKey = lastPressedKey;

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

const dialogo = new Dialogo(mainMenuDialogue);
dialogo.initDialog();

function handleKeyDown(e) {
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case ' ':
                if (!player.interactionAsset) return

                if (!player.interactionAsset.character.dialogue) {
                    console.log("player.interactionAsset: ", player.interactionAsset)
                    console.log("characters: ", characters)

                    var modal = document.getElementById("dialog-modal");
                    modal.style.display = "flex";

                    if ( !player.interactionAsset.character.dialogue ) {
                        const startBtn = document.querySelector("#start-button")
                        startBtn.style.display = "flex";
                    }

                } else {
                    console.log('entrou em NPC');
                    // beginning the conversation
                    const firstMessage = player.interactionAsset.character.dialogue[0]
                    document.querySelector('#characterDialogueBox').innerHTML = firstMessage
                    document.querySelector('#characterDialogueBox').style.display = 'flex'
                    player.isInteracting = true
                }
                break

            case 'w':
                keys.w.pressed = true
                lastKey = 'w'
                break
            case 'a':
                keys.a.pressed = true
                lastKey = 'a'
                break

            case 's':
                keys.s.pressed = true
                lastKey = 's'
                break

            case 'd':
                keys.d.pressed = true
                lastKey = 'd'
                break
        }
    })
}

function handleKeyUp(e) {
    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'w':
                keys.w.pressed = false
                break
            case 'a':
                keys.a.pressed = false
                break
            case 's':
                keys.s.pressed = false
                break
            case 'd':
                keys.d.pressed = false
                break
        }
    })
}