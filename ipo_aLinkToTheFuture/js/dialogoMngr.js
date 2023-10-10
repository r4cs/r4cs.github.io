class Dialogo {
  constructor(tree) {
      this.tree = tree;
  }

  initDialog() {
    const options = {
      speed: 1,
      firstMessage: 'menu',
      autoNext: true
    };
    
    const sycamore = new Sycamore(this.tree, options);

    const typing = document.querySelector('.typing');
    const botText = document.querySelector('.bot-text');
    const answers = document.querySelector('.answers');
    const startBtn = document.getElementById("start-button");
    const quitBtn = document.getElementById("quit-button");
    
    let delay = 0;
    
    
    
    sycamore.on('typing', (wait) => {
            console.log(`%cTyping for ${wait}ms...`, 'color: blue')
            typing.classList.add('active')
            botText.classList.remove('active')
        })

        sycamore.on('message', (obj) => {
            console.log(`%c${obj.text}`, 'color: red')
            typing.classList.remove('active')

            botText.innerHTML = obj.text
            botText.classList.add('active')
        })

        // when the question is asked, wait 2 seconds and call the answer() method with the first answer
        sycamore.on('question', (obj) => {
            console.log(`%c${obj.question}`, 'color: red')
            typing.classList.remove('active')

            botText.innerHTML = obj.question
            botText.classList.add('active')


            if (obj.answers) {
                obj.answers.forEach((answer) => {
                    let answerElm = document.createElement('div')
                    answerElm.style.width = ("90%")
                    answerElm.style.margin = ("3px")
                    answerElm.classList.add('bubble')
                    answerElm.classList.add('answer')
                    answerElm.innerHTML = answer.text

                    answers.appendChild(answerElm)

                    setTimeout(() => {
                        answerElm.classList.add('active')
                    }, delay)

                    answerElm.addEventListener('click', () => {
                        sycamore.answer(answer.text)
                        answers.innerHTML = ''
                        botText.classList.remove('active')
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
                answers.appendChild(answerElm)

                setTimeout(() => {
                    answerElm.classList.add('active')
                }, delay)

                button.addEventListener('click', () => {
                    if (input.value) {
                        sycamore.answer(input.value)
                        answers.innerHTML = ''
                        botText.classList.remove('active')
                    }
                })
            }
        })

        sycamore.on('answered', (qa) => {
            console.log('%cAnswer collected:', 'color: turquoise')
            console.log(qa)
        })

        sycamore.on('delay', (delay) => {
            console.log(`%cDelaying for ${delay}ms before asking next question...`, 'color: purple')
        })

        sycamore.on('update', (data) => {
            console.log('%cUpdated collected data:', 'color: lightcoral')
            console.log(data)
        })

        sycamore.on('finished', (data) => {
//        sycamore.on('finished', (obj) => {
            
            document.getElementById("dialog-modal").style.display = "none";
          
            const botText = document.querySelector('.bot-text');
            botText.innerHTML = '';
            botText.classList.remove('active');
          
            const answers = document.querySelector('.answers');
            answers.innerHTML = '';
            console.log('answers: ', answers)

            quitBtn.style.display = 'none';
          
//            console.log('obj.question: ', obj.question )
          
            setTimeout(() => {
                  console.log("end of conversation")
            }, 1500)
            data = null;
            })
        
      startBtn.addEventListener('click', () => {

          startBtn.style.display = "none";
          quitBtn.style.display = 'flex';
          sycamore.init();
      });

      quitBtn.addEventListener('click', () => {
          sycamore.emitter.emit('finished');
      });
                                         
}}


