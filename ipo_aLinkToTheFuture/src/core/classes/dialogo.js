// src/core/classes/dialogo.js
import * as Constants from "../constants/index.js";

export class Dialogo {
    constructor(dialogTree) {
        this.dialogTree = dialogTree;
        this.sycamore = null;
        this.delay = Constants.DIALOGUE_CONFIG.BUBBLE_APPEAR_DELAY;

        this.typing = document.querySelector('.typing');
        this.botText = document.querySelector('.bot-text');
        this.answers = document.querySelector('.answers');
        this.startBtn = document.getElementById("start-button");
        this.quitBtn = document.getElementById("quit-button");

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => {
            this.startBtn.style.display = "none";
            this.quitBtn.style.display = 'flex';
            if (this.sycamore) {
                this.sycamore.init();
            }
        });

        this.quitBtn.addEventListener('click', () => {
            if (this.sycamore) {
                this.sycamore.emitter.emit('finished');
            }
        });
    }

    initDialog() {
        const options = {
            speed: 1,
            firstMessage: 'mainMenuDialogue',
            autoNext: true
        };

        if (!this.sycamore) {
            this.sycamore = new Sycamore(this.dialogTree, options);

            this.setupSycamoreListeners();
        }
    }

    setupSycamoreListeners() {
        this.sycamore.on('typing', (wait) => {
            console.log(`%cTyping for ${wait}ms...`, 'color: blue');
            this.typing.classList.add('active');
            this.botText.classList.remove('active');
        });

        this.sycamore.on('message', (objMessageData) => {
            console.log(`%c${objMessageData.text}`, 'color: red');
            this.typing.classList.remove('active');
            this.botText.innerHTML = objMessageData.text;
            this.botText.classList.add('active');
        });

        this.sycamore.on('question', (objMessageData) => {
            console.log(`%c${objMessageData.question}`, 'color: red');
            this.typing.classList.remove('active');
            this.botText.innerHTML = objMessageData.question;
            this.botText.classList.add('active');

            this.handleQuestion(objMessageData);
        });
            
        this.sycamore.on('finished', (conversationData) => {
            this.handleConversationFinished();
        });
    }

    handleQuestion(objMessageData) {
        if (objMessageData.answers) {
            this.answers.innerHTML = '';
            objMessageData.answers.forEach((answer) => {
                this.createAnswerElement(answer);
            });
        } else if (objMessageData.input) {
            this.createInputElement(objMessageData.input);
        }
    }

    createAnswerElement(answer) {
        let answerElement = document.createElement('div');
        answerElement.style.width = "90%";
        answerElement.style.margin = "3px";
        answerElement.classList.add('bubble');
        answerElement.classList.add('answer');
        answerElement.innerHTML = answer.text;

        this.answers.appendChild(answerElement);

        setTimeout(() => {
            answerElement.classList.add('active');
        }, this.delay);

        answerElement.addEventListener('click', () => {
            this.sycamore.answer(answer.text);
            this.answers.innerHTML = '';
            this.botText.classList.remove('active');
        });
    }

    createInputElement(input) {
        let answerElement = document.createElement('div');
        answerElement.classList.add('bubble');
        answerElement.classList.add('answer');

        let inputField = document.createElement('input');
        inputField.setAttribute('placeholder', input.label);

        let submitButton = document.createElement('button');
        submitButton.innerHTML = 'Submit';

        answerElement.appendChild(inputField);
        answerElement.appendChild(submitButton);
        this.answers.appendChild(answerElement);

        setTimeout(() => {
            answerElement.classList.add('active');
        }, this.delay);

        submitButton.addEventListener('click', () => {
            if (inputField.value) {
                this.sycamore.answer(inputField.value);
                this.answers.innerHTML = '';
                this.botText.classList.remove('active');
            }
        });
    }

    handleConversationFinished() {
        document.getElementById("dialog-modal").style.display = "none";
        this.botText.innerHTML = '';
        this.botText.classList.remove('active');
        this.answers.innerHTML = '';
        this.quitBtn.style.display = 'none';
        
        this.sycamore.currentQuestion = null;
        this.sycamore.conversationFinished = false;

        setTimeout(() => {
            console.log("end of conversation");
        }, this.delay);
    }
}