console.log("Rodando The Legend of IPO - A link to the future");

// Variáveis globais
let canvas;
let canvasContext;
let collisionsMap;
let charactersMap;
let boundaries;
let characters;
let player;
let background;
let foreground;
let movableEntities;
let renderableEntities;

// Input handlers (agora no escopo global)
function handleKeyDown(keyboardEvent) {
    switch (keyboardEvent.key) {
        case ' ':
            handleInteractionKey();
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

function handleInteractionKey() {
    if (!player.interactionAsset) return;

    if (!player.interactionAsset.character.dialogue) {
        console.log("player.interactionAsset: ", player.interactionAsset);
        const modal = document.getElementById("dialog-modal");
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
}

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

function simulateKey(eventType, key) {
    const keyboardEvent = new KeyboardEvent(eventType, { key: key });
    window.dispatchEvent(keyboardEvent);
}

// Inicialização principal
function initializeGame() {
    setupCanvas();
    initializeMaps();
    createGameEntities();
    setupInputHandlers();
    startGameLoop();
}

// Configuração do canvas
function setupCanvas() {
    canvas = document.querySelector("canvas");
    canvasContext = canvas.getContext("2d");
    canvas.width = CANVAS.WIDTH;
    canvas.height = CANVAS.HEIGHT;
}

// Inicialização de mapas
function initializeMaps() {
    collisionsMap = createMapFromData(collisions, 100);
    charactersMap = createMapFromData(charactersMapData, 100);
}

function createMapFromData(data, chunkSize) {
    const map = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        map.push(data.slice(i, i + chunkSize));
    }
    return map;
}

// Criação de entidades do jogo
function createGameEntities() {
    createBoundaries();
    createCharacters();
    createPlayer();
    createBackgroundAndForeground();
    setupEntityLists();
}

function createBoundaries() {
    boundaries = [];
    const offset = { x: MOVEMENT.OFFSET.X, y: MOVEMENT.OFFSET.Y };
    
    collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === TILE.COLLISION) {
                boundaries.push(createBoundary(j, i, offset));
            }
        });
    });
}

function createBoundary(x, y, offset) {
    return new Boundary({
        position: {
            x: x * BOUNDARY.WIDTH + offset.x,
            y: y * BOUNDARY.HEIGHT + offset.y
        }
    });
}

function createCharacters() {
    characters = [];
    const offset = { x: MOVEMENT.OFFSET.X, y: MOVEMENT.OFFSET.Y };
    
    charactersMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            handleCharacterCreation(symbol, j, i, offset);
        });
    });
}

function handleCharacterCreation(symbol, x, y, offset) {
    const position = {
        x: x * BOUNDARY.WIDTH + offset.x,
        y: y * BOUNDARY.HEIGHT + offset.y
    };

    if (symbol === CHARACTER.BOB) {
        createBobCharacter(position);
    } else if (isAmeliaCharacter(symbol)) {
        createAmeliaCharacter(position);
    }
    
    if (symbol !== TILE.EMPTY) {
        boundaries.push(new Boundary({ position }));
    }
}

function isAmeliaCharacter(symbol) {
    return symbol === CHARACTER.AMELIA.BASE ||
           symbol === CHARACTER.AMELIA.VARIANT_1 ||
           symbol === CHARACTER.AMELIA.VARIANT_2 ||
           symbol === CHARACTER.AMELIA.VARIANT_3 ||
           symbol === CHARACTER.AMELIA.VARIANT_4;
}

function createBobCharacter(position) {
    characters.push(new Character({
        name: 'bob',
        position: position,
        image: bobSprite,
        frames: { max: 9, hold: 10 },
        scale: 3,
        animate: true,
        dialogue: null
    }));
}

function createAmeliaCharacter(position) {
    characters.push(new Character({
        name: 'amelia',
        position: position,
        image: ameliaSprite,
        frames: { max: 9, hold: 10 },
        scale: 3,
        animate: true,
        dialogue: ['...', 'Perdi tudinho...']
    }));
}

function createPlayer() {
    player = new Sprite({
        position: {
            x: canvas.width / 2 - 192 / 4 / 2,
            y: canvas.height / 2 - 68 / 2
        },
        image: playerDownSprite,
        frames: { max: 3, hold: 10 },
        sprites: {
            up: playerUpSprite,
            left: playerLeftSprite,
            right: playerRightSprite,
            down: playerDownSprite
        },
    });
}

function createBackgroundAndForeground() {
    const offset = { x: MOVEMENT.OFFSET.X, y: MOVEMENT.OFFSET.Y };
    
    background = new Sprite({
        position: offset,
        image: backgroundImage
    });

    foreground = new Sprite({
        position: offset,
        image: foregroundImage
    });
}

function setupEntityLists() {
    movableEntities = [
        background,
        ...boundaries,
        foreground,
        ...characters
    ];

    renderableEntities = [
        background,
        ...boundaries,
        ...characters.filter(character => character !== CHARACTER.AMELIA.BASE),
        player,
        foreground
    ];
}

// Configuração de input
function setupInputHandlers() {
    setupKeyboardInput();
    setupButtonInput();
    setupDialogueSystem();
}

function setupKeyboardInput() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

function setupButtonInput() {
    const buttonElements = document.querySelectorAll('.directions button, .buttons button');
    buttonElements.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button.classList[0]));
    });
}

function setupDialogueSystem() {
    const dialogo = new Dialogo(mainMenuDialogue);
    dialogo.initDialog();
}

// Loop do jogo
function startGameLoop() {
    animate();
}

// Inicializar o jogo
initializeGame();