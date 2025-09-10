class Dialogo {
    constructor(dialogTree) {
        this.dialogTree = dialogTree;
        this.sycamore = null;

        this.typing = document.querySelector('.typing');
        this.botText = document.querySelector('.bot-text');
        this.answers = document.querySelector('.answers');
        this.startBtn = document.getElementById("start-button");
        this.quitBtn = document.getElementById("quit-button");

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
            firstMessage: 'menu',
            autoNext: true
        };

        if (!this.sycamore) {
            this.sycamore = new Sycamore(this.dialogTree, options);

            this.sycamore.on('typing', (wait) => {
                console.log(`%cTyping for ${wait}ms...`, 'color: blue')
                this.typing.classList.add('active')
                this.botText.classList.remove('active')
            });

            this.sycamore.on('message', (objMessageData) => {
                console.log(`%c${objMessageData.text}`, 'color: red')
                this.typing.classList.remove('active')
                this.botText.innerHTML = objMessageData.text
                this.botText.classList.add('active')
            });

            this.sycamore.on('question', (objMessageData) => {
            console.log(`%c${objMessageData.question}`, 'color: red')
            this.typing.classList.remove('active')
            this.botText.innerHTML = objMessageData.question
            this.botText.classList.add('active')

            if (objMessageData.answers) {
                this.answers.innerHTML = '';
                objMessageData.answers.forEach((answer) => {
                    let answerElment = document.createElement('div')
                    answerElment.style.width = ("90%")
                    answerElment.style.margin = ("3px")
                    answerElment.classList.add('bubble')
                    answerElment.classList.add('answer')
                    answerElment.innerHTML = answer.text

                    this.answers.appendChild(answerElment)

                    setTimeout(() => {
                        answerElment.classList.add('active')
                    }, this.delay)

                    answerElment.addEventListener('click', () => {
                        this.sycamore.answer(answer.text)
                        this.answers.innerHTML = ''
                        this.botText.classList.remove('active')
                    })
                })
            } else if (objMessageData.input) {
                let answerElment = document.createElement('div')
                answerElment.classList.add('bubble')
                answerElment.classList.add('answer')

                let inputField = document.createElement('input')
                inputField.setAttribute('placeholder', objMessageData.input.label)

                let submitButton = document.createElement('button')
                submitButton.innerHTML = 'Submit'

                answerElment.appendChild(inputField)
                answerElment.appendChild(submitButton)
                this.answers.appendChild(answerElment)

                setTimeout(() => {
                    answerElment.classList.add('active')
                }, this.delay)

                submitButton.addEventListener('click', () => {
                    if (inputField.value) {
                        this.sycamore.answer(inputField.value)
                        this.answers.innerHTML = ''
                        this.botText.classList.remove('active')
                    }
                })
            }
        })
            
            this.sycamore.on('finished', (conversationData) => {
                document.getElementById("dialog-modal").style.display = "none";
                this.botText.innerHTML = '';
                this.botText.classList.remove('active');
                this.answers.innerHTML = '';
                this.quitBtn.style.display = 'none';
                
                this.sycamore.currentQuestion = null;
                this.sycamore.conversationFinished = false;

                setTimeout(() => {
                    console.log("end of conversation")
                }, 1500)
            });
        }
    }
}
