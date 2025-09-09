class Dialogo {
    constructor(tree) {
        this.tree = tree;
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
            this.sycamore = new Sycamore(this.tree, options);

            this.sycamore.on('typing', (wait) => {
                console.log(`%cTyping for ${wait}ms...`, 'color: blue')
                this.typing.classList.add('active')
                this.botText.classList.remove('active')
            });

            this.sycamore.on('message', (obj) => {
                console.log(`%c${obj.text}`, 'color: red')
                this.typing.classList.remove('active')
                this.botText.innerHTML = obj.text
                this.botText.classList.add('active')
            });

            this.sycamore.on('question', (obj) => {
            console.log(`%c${obj.question}`, 'color: red')
            this.typing.classList.remove('active')
            this.botText.innerHTML = obj.question
            this.botText.classList.add('active')

            if (obj.answers) {
                this.answers.innerHTML = '';
                obj.answers.forEach((answer) => {
                    let answerElm = document.createElement('div')
                    answerElm.style.width = ("90%")
                    answerElm.style.margin = ("3px")
                    answerElm.classList.add('bubble')
                    answerElm.classList.add('answer')
                    answerElm.innerHTML = answer.text

                    this.answers.appendChild(answerElm)

                    setTimeout(() => {
                        answerElm.classList.add('active')
                    }, this.delay)

                    answerElm.addEventListener('click', () => {
                        this.sycamore.answer(answer.text)
                        this.answers.innerHTML = ''
                        this.botText.classList.remove('active')
                    })
                })
            } else if (obj.input) {
                let answerElm = document.createElement('div')
                answerElm.classList.add('bubble')
                answerElm.classList.add('answer')

                let input = document.createElement('input')
                input.setAttribute('placeholder', obj.input.label)

                let button = document.createElement('button')
                button.innerHTML = 'Submit'

                answerElm.appendChild(input)
                answerElm.appendChild(button)
                this.answers.appendChild(answerElm)

                setTimeout(() => {
                    answerElm.classList.add('active')
                }, this.delay)

                button.addEventListener('click', () => {
                    if (input.value) {
                        this.sycamore.answer(input.value)
                        this.answers.innerHTML = ''
                        this.botText.classList.remove('active')
                    }
                })
            }
        })
            
            this.sycamore.on('finished', (data) => {
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
