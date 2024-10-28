import { quizQuestions } from "./questions.js";
// comment
const questionContainer = document.querySelector('.quiz-question-container');
const displaytimevalue = document.querySelector('.time-left-value');
const displayTime=document.querySelector('.quiz-timer');
const discurrentques = document.querySelector('.quiz-questions-currect');
const distotalques = document.querySelector('.quiz-question-total');
const progess=document.querySelector('.quiz-progress');
const restart=document.querySelector('.btn');

let totalQuestion = 5;
let currentIndex = 0;
let questions = [];
let timer ;
let currentTime ;

let clickOption = [];
let val = 0;



let proval=100;
let protrue=false;

function startapp(){

    restart.style.visibility = 'hidden';

    questionContainer.innerHTML='';

 let timerContainer=document.createElement('div');
 timerContainer.classList.add('timer-container');

 const label = document.createElement('label');
 label.classList.add('timer-label');
 label.textContent = 'Select the timer:';
 const selectElement = document.createElement('select');
 selectElement.classList.add('timer-select');
 selectElement.id='timer-select';

 const options = [8, 10, 15];
 options.forEach(optionValue => {
     const option = document.createElement('option'); 
     option.value = optionValue; 
     option.textContent = optionValue; 
     selectElement.appendChild(option); 
 });

 const label1 = document.createElement('label');
 label1.classList.add('timer-label');
 label1.textContent = 'Select Question No:';

 const selectQuesNo = document.createElement('select');
 selectQuesNo.classList.add('timer-select');
 selectQuesNo.id='timer-select';

 const questNo=[5 ,10 , 15];
 questNo.forEach((ques)=>{
    const option =document.createElement('option');
    option.value =ques;
    option.textContent=ques;
    selectQuesNo.appendChild(option);
 })

 const startButton = document.createElement('button');

 startButton.classList.add('start-button'); 
 startButton.innerHTML = '<img src="icon/play-circle-svgrepo-com.svg" alt="Start">';
 

 timerContainer.appendChild(label);
 timerContainer.appendChild(selectElement);
 timerContainer.appendChild(label1);
 timerContainer.appendChild(selectQuesNo);
 timerContainer.appendChild(startButton);

 questionContainer.append(timerContainer)

    displayTime.style.visibility='hidden';
   


    startButton.addEventListener('click',()=>{
        
        const selectedValue = selectElement.value;
       timer=selectedValue;
       currentTime=timer;
       proval=timer;
       protrue=true;
       questions = [];
       totalQuestion=selectQuesNo.value;
       randomQuestion();
       updateQuestion();
    })
  
 }
 
 restart.addEventListener('click',()=>{
    currentIndex=0;
    
    
    startapp();
    randomQuestion();
    setInterval(interval, 1000);
 })

function randomQuestion() {

    for (let i = 0; i < totalQuestion; i++) {
        let index = Math.floor(Math.random() * quizQuestions.length);
        questions.push(quizQuestions[index]);
    }

    return questions;
}



function updateQuestion() {

    distotalques.textContent = totalQuestion;

    startTimer();

    displayTime.style.visibility='visible';

    displaytimevalue.textContent = timer;

    questionContainer.innerHTML = '';

    let currentQuestion = questions[currentIndex];

    const h2 = document.createElement('h2');
    h2.classList.add('quiz-question');
    const span = document.createElement('span');
    span.innerText = currentIndex + 1;

    discurrentques.textContent = currentIndex + 1;

    h2.append(span);
    h2.append(` ${currentQuestion.question}`);
    questionContainer.append(h2);


    const optionContainer = document.createElement('div');
    optionContainer.classList.add('quiz-options');

    currentIndex++;

    currentQuestion.options.forEach(idx => {

        const button = document.createElement('button');
        button.classList.add('quiz-option');

        const option = document.createElement('div');
        option.classList.add('quiz-option-text');

        const img = document.createElement('img');
        img.classList.add('quiz-option-image');

        option.textContent = idx;
        button.append(option, img)
        optionContainer.append(button);



        button.addEventListener('click', (event) => {
            checkOption(event, currentQuestion, optionContainer);
        })
    });
  
    clickOption.push(val);
    val = null;
    questionContainer.append(optionContainer);
}


function checkOption(event, currentQuestion, optionContainer) {

    const optionText = event.currentTarget.querySelector('.quiz-option-text').innerText;

    val = optionText;

    let correctAns = currentQuestion.answer;
    if (optionText === correctAns) {
        event.currentTarget.classList.add('correct');
    }
    else {
        event.currentTarget.classList.add('incorrect');
    }
    const btn = event.currentTarget;

    optionContainer.querySelectorAll('.quiz-option').forEach((btn) => {
        btn.disabled = true;
    })


    setTimeout(() => {
        if (currentIndex === questions.length) {
            clickOption.push(val);
            bar=100;
            progess.style.width=`${bar}%`;
            showResult();
            displaytimevalue.textContent = '00';
            clearInterval(interval)
        }
        else {
            currentTime = timer;
            bar=100;
            progess.style.width=`${bar}%`;
            updateQuestion();
        }
    }, 500);
}

function showResult() {

    restart.style.visibility='visible'
    clickOption.shift();
   
    


    questionContainer.innerHTML = '';
    let resultBox = document.createElement('div');




        let idx = 0;
    questions.forEach((element) => {

        let currentOption = questions[idx];

       

        resultBox.classList.add('result-box');

        let resultQuestion = document.createElement('h2');
        resultQuestion.classList.add('quiz-question-result');

        let resultCorrect = document.createElement('div');
        resultCorrect.classList.add('quiz-option');
        resultCorrect.classList.add('correct');

        let resultIncorrect = document.createElement('div');
        resultIncorrect.classList.add('quiz-option');
        

        currentOption.options.forEach((option) => {
            
            if(clickOption[idx]=== null){
                resultIncorrect.classList.add('null')
                resultIncorrect.textContent='null';
            }
           else if (option === clickOption[idx])
                if(element.answer === clickOption[idx]){
                    resultIncorrect.textContent=option;
                    resultIncorrect.classList.add('correct');
                }
                else{

                    resultIncorrect.textContent = option;
                    resultIncorrect.classList.add('incorrect');
                }
        })

        resultQuestion.textContent = element.question;
        resultCorrect.textContent = element.answer;
        resultBox.append(resultQuestion, resultCorrect, resultIncorrect);
        idx++;
    })


    questionContainer.append(resultBox);

    clickOption.length=0;
}



let bar=100;
let change;let interval;

// Function to start the interval
function startTimer() {
    clearInterval(interval); // Clear any existing interval to avoid duplication

    interval = setInterval(() => {
        if (protrue) {
            change = 100 / proval;
        } else {
            change = 0;
        }

        currentTime--;
        bar = bar - change;
        progess.style.width = `${bar}%`;

        if (currentTime === -1) {
            currentTime = timer;

            if (currentIndex === questions.length) {
                displaytimevalue.textContent = '00';
                showResult();
                clearInterval(interval);
                bar = 100;
                progess.style.width = `${bar}%`;
            } else {
                bar = 100;
                updateQuestion();
                progess.style.width = `${bar}%`;
            }
        } else {
            displaytimevalue.textContent = currentTime;
        }
    }, 1000);
}



startapp();


