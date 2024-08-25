import './style.css'

const generateGrid = () =>{
    let container = document.querySelector<HTMLDivElement>('.container__game-grid');
    
    if(!container ){
        throw new Error ("Encountered issue creating the main grid");
    }

    for(let i:number =0; i<8; i++){
        container.innerHTML += '<div class="cell--column"></div>';
    }
    let column = document.querySelectorAll<HTMLDivElement>('.cell--column');

    column.forEach((col)=>{
        for(let i:number =0; i<8; i++){
        col.innerHTML += '<div class="cell--row"></div>';
        }
    })

}


generateGrid();

// let timer: number = 0;
// let timerDisplay = document.querySelector<HTMLInputElement>("#timerBox");

// const stopwatch=()=>{
//     timer++;
//     timerDisplay.value=timer;
// }

// let cells = document.querySelectorAll<HTMLDivElement>(".cell--row");

// cells.forEach((cell) => {
//     cell.addEventListener('click', displayTime);
// });

// const displayTime = (event:Event) =>{
//     setInterval(stopwatch,1000);

// }


/* let cells = document.querySelectorAll<HTMLDivElement>(".cell--row");
let restartBtn = document.querySelector<HTMLButtonElement>("#restartButton");

let secs: number = 0;
let mins: number = 0;
let startTimer = false;

cells.forEach((cell) => {
    cell.addEventListener('click', checkTimer);
});

const checkTimer = () =>{
 if(startTimer === false){
    startTimer = true;
    setInterval(displayTime,1000);
 }   
};

const displayTime= ()=>{
 */
//}

const restartButton = document.querySelector<HTMLButtonElement>("#restartButton");
const startButton = document.querySelector<HTMLDivElement>(".container__game-grid");
const TimeDisplay = document.querySelector<HTMLInputElement>("#timerBox");

let secs: number | string = 0;
let mins: number | string= 0;
let timeCounter: number = 0;
let interval;

if(!TimeDisplay){
    throw new Error("Unable to find the timer input element");
}

const updateTime = () =>{
    console.log("here");
    secs = Math.floor(timeCounter % 60);
    mins = Math.floor((timeCounter/60)%60);
    if (secs < 10){
        secs = "0" + secs.toString();
    }
    if(mins < 10){
        mins = "0" + mins.toString();
    }
    TimeDisplay.value = `${mins}:${secs}`;
    timeCounter++;

}


startButton?.addEventListener('click',()=>{
   interval = setInterval(updateTime,1000);
  // console.log("event listener called")
});

restartButton?.addEventListener('click', ()=>{
    clearInterval(interval);
    secs = 0;
    mins = 0;
    timeCounter = 0;
    TimeDisplay.value = "00:00";
})