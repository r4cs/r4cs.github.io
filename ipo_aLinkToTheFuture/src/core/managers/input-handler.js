// src/core/input-handler.js
export class InputHandler {
    constructor() {
        this.keyboardState = {
            w: { pressed: false },
            a: { pressed: false },
            s: { pressed: false },
            d: { pressed: false }
        };
        
        this.lastKey = '';
        this.buttonMappings = {
            'arrow-top': 'w',
            'arrow-left': 'a',
            'arrow-bottom': 's',
            'arrow-right': 'd',
            'button-a': ' ',
            'button-b': 'quit'
        };
        
        this.init();
    }

    init() {
        this.setupKeyboardListeners();
        this.setupButtonListeners();
    }

    setupKeyboardListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    setupButtonListeners() {
        const buttonElements = document.querySelectorAll('.directions button, .buttons button');
        buttonElements.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button.classList[0]));
        });
    }

    handleKeyDown(e) {
        switch (e.key) {
            case 'w':
                this.keyboardState.w.pressed = true;
                this.lastKey = 'w';
                break;
            case 'a':
                this.keyboardState.a.pressed = true;
                this.lastKey = 'a';
                break;
            case 's':
                this.keyboardState.s.pressed = true;
                this.lastKey = 's';
                break;
            case 'd':
                this.keyboardState.d.pressed = true;
                this.lastKey = 'd';
                break;
            case ' ':
                // Espaço será tratado separadamente
                break;
        }
    }

    handleKeyUp(e) {
        switch (e.key) {
            case 'w':
                this.keyboardState.w.pressed = false;
                break;
            case 'a':
                this.keyboardState.a.pressed = false;
                break;
            case 's':
                this.keyboardState.s.pressed = false;
                break;
            case 'd':
                this.keyboardState.d.pressed = false;
                break;
        }
    }

    handleButtonClick(buttonClass) {
        const key = this.buttonMappings[buttonClass];
        if (key) {
            this.simulateKeyPress(key);
        }
    }

    simulateKeyPress(key) {
        const event = new KeyboardEvent('keydown', { key: key });
        window.dispatchEvent(event);
    }

    getKeys() {
        return this.keyboardState;
    }

    getLastKey() {
        return this.lastKey;
    }
}