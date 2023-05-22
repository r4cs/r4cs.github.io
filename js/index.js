console.log("Rodando The Legend of IPO - A link to the future");

const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");


canvas.width = 1024;
canvas.height = 1000;


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
	// inicio oficial
//	x: -4000, // começa perto do bot da praia
//	y: -1600
  x: -1500, // comeca perto do bot dos limoes
  y: -1350
  
	
};

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 95705) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            );
        }
    });
});


const characters = [];

const bot = new Image();
bot.src = "./img/characters/Bob_phone_16x16.png";

const amelia = new Image();
amelia.src = "./img/characters/Amelia_phone_16x16.png";

  
charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 87906) {
      characters.push(
        new Character({
          name: 'bob',
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: bot,          
          frames: {
            max: 9, // quantidade de frames
            hold: 10 // 60 // tempo troca frames
          },
          scale: 3, // tamanho
          animate: true,
          dialogue: null
//          dialogue: menu
        })
      )
    }
    
    if (symbol === 87904 | symbol === 87905 | symbol === 87907 | symbol === 87908 | symbol === 87909) {
      characters.push(
        new Character({
          name: 'amelia',
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
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
    if (symbol !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
    }
  })
})


const image = new Image();
image.src = "./img/city/city.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/city/cityForeground.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/player/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/player/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/player/payerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/player/playerRight.png";


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



const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
  
    d: {
        pressed: false
    }
};


const movables = [
	background, 
	...boundaries, 
	foreground, 
	...characters];

const renderables = [
	background, 
	...boundaries, 
	...characters.filter(character => character != 87904),
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
      characterOffset: { x: 0, y: 3 }
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
              y: boundary.position.y + 3
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
        movable.position.y += 3
      })
  } else if (keys.a.pressed && lastKey === 'a') {
    player.animate = true
    player.image = player.sprites.left

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
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
        movable.position.x += 3
      })
  } else if (keys.s.pressed && lastKey === 's') {
    player.animate = true
    player.image = player.sprites.down

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -3 }
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
              y: boundary.position.y - 3
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
        movable.position.y -= 3
      })
  } else if (keys.d.pressed && lastKey === 'd') {
    player.animate = true
    player.image = player.sprites.right

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
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
        movable.position.x -= 3
      })
  }
}

animate();


let lastKey = ''
window.addEventListener('keydown', (e) => {
  // ncomeco do teste
    if (player.isInteracting) {
      console.log('player is interacting!');
      switch (e.key) {
        case ' ':
          player.interactionAsset.character.dialogueIndex++

          const dialogue = player.interactionAsset.character.dialogue
          const dialogueIndex = player.interactionAsset.character.dialogueIndex
          if (dialogueIndex <= dialogue.length - 1) {
            document.querySelector('#characterDialogueBox').innerHTML =
              player.interactionAsset.character.dialogue[dialogueIndex]
            document.querySelector('#characterDialogueBox').style.display = 'flex';
            return
          }

          // finish conversation
          player.isInteracting = false
          player.interactionAsset.dialogueIndex = 0
          document.querySelector('#characterDialogueBox').style.display = 'none'

          break
      }
      return
  }
  
  // fim od teste
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
        const dialogo = new Dialogo(menu);

        startBtn.addEventListener("click", () => {
          dialogo.initDialog();
        })
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