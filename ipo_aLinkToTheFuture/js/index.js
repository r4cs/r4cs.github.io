console.log("Rodando The Legend of IPO - A link to the future");

const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");

canvas.width = CANVAS.WIDTH;
canvas.height = CANVAS.HEIGHT;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 100) {
    collisionsMap.push(collisions.slice(i, 100 + i));
}

const charactersMap = [];
for (let i = 0; i < charactersMapData.length; i += 100) {
    charactersMap.push(charactersMapData.slice(i, 100 + i));
}

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

const bobSprite = new Image();
bobSprite.src = "./img/characters/Bob_phone_16x16.png";

const ameliaSprite = new Image();
ameliaSprite.src = "./img/characters/Amelia_phone_16x16.png";

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
                    image: bobSprite,
                    frames: {
                        max: 9,
                        hold: 10
                    },
                    scale: 3,
                    animate: true,
                    dialogue: null
                })
            );
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
                    image: ameliaSprite,
                    frames: {
                        max: 9,
                        hold: 10
                    },
                    scale: 3,
                    animate: true,
                    dialogue: ['...', 'Perdi tudinho...']
                })
            );
        }
        
        if (symbol !== TILE.EMPTY) {
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

const backgroundImage = new Image();
backgroundImage.src = "./img/city/city.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/city/cityForeground.png";

const playerDownSprite = new Image();
playerDownSprite.src = "./img/player/playerDown.png";

const playerUpSprite = new Image();
playerUpSprite.src = "./img/player/playerUp.png";

const playerLeftSprite = new Image();
playerLeftSprite.src = "./img/player/payerLeft.png";

const playerRightSprite = new Image();
playerRightSprite.src = "./img/player/playerRight.png";

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownSprite,
    frames: {
        max: 3,
        hold: 10
    },
    sprites: {
        up: playerUpSprite,
        left: playerLeftSprite,
        right: playerRightSprite,
        down: playerDownSprite
    },
});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: backgroundImage
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

const keyboardState = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};

const movableEntities = [
    background,
    ...boundaries,
    foreground,
    ...characters
];

const renderableEntities = [
    background,
    ...boundaries,
    ...characters.filter(character => character !== CHARACTER.AMELIA.BASE),
    player,
    foreground
];

function initializeGame() {
    animate();
}

initializeGame();

let lastDirectionClicked = '';

const buttonMappings = {
    'arrow-top': 'w',
    'arrow-left': 'a',
    'arrow-bottom': 's',
    'arrow-right': 'd',
    'button-a': ' ',
    'button-b': 'quit'
};

function handleButtonClick(button) {
    const key = buttonMappings[button];
    if (key) {
        if (lastDirectionClicked === key) {
            simulateKey('keyup', key);
            lastDirectionClicked = '';
        } else {
            simulateKey('keydown', key);
            lastDirectionClicked = key;
        }
    }
}

const buttonElements = document.querySelectorAll('.directions button, .buttons button');
buttonElements.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.classList[0]));
});

function simulateKey(eventType, key) {
    const keyboardEvent = new KeyboardEvent(eventType, { key: key });
    window.dispatchEvent(keyboardEvent);
}

let lastPressedKey = '';

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

const dialogo = new Dialogo(mainMenuDialogue);
dialogo.initDialog();

function handleKeyDown(keyboardEvent) {
    switch (keyboardEvent.key) {
        case ' ':
            if (!player.interactionAsset) return;

            if (!player.interactionAsset.character.dialogue) {
                console.log("player.interactionAsset: ", player.interactionAsset);

                var modal = document.getElementById("dialog-modal");
                modal.style.display = "flex";

                if (!player.interactionAsset.character.dialogue) {
                    const startBtn = document.querySelector("#start-button");
                    startBtn.style.display = "flex";
                }
            } else {
                console.log('entrou em NPC');
                const firstMessage = player.interactionAsset.character.dialogue[0];
                document.querySelector('#characterDialogueBox').innerHTML = firstMessage;
                document.querySelector('#characterDialogueBox').style.display = 'flex';
                player.isInteracting = true;
            }
            break;

        case 'w':
            keyboardState.w.pressed = true;
            lastPressedKey = 'w';
            break;
        case 'a':
            keyboardState.a.pressed = true;
            lastPressedKey = 'a';
            break;
        case 's':
            keyboardState.s.pressed = true;
            lastPressedKey = 's';
            break;
        case 'd':
            keyboardState.d.pressed = true;
            lastPressedKey = 'd';
            break;
    }
}

function handleKeyUp(keyboardEvent) {
    switch (keyboardEvent.key) {
        case 'w':
            keyboardState.w.pressed = false;
            break;
        case 'a':
            keyboardState.a.pressed = false;
            break;
        case 's':
            keyboardState.s.pressed = false;
            break;
        case 'd':
            keyboardState.d.pressed = false;
            break;
    }
}