import './style.css'

const generateGrid = () =>{
    let container = document.querySelector<HTMLDivElement>('.container__game-grid');
    
    if(!container ){
        throw new Error ("Encountered issue creating the main grid");
    }

    for(let i:number =0; i<8; i++){
        for(let j:number =0; j<8; j++){
            
            container.innerHTML += `<div id="${i}${j}" class="container__game-grid--cell"></div>`;

        }
    }

    const noOfMines: number= 10;
    const minePositions: string[] = [];
    let randomNumber: number | string;
    let i: number=0;

    while( i < noOfMines){
        randomNumber = Math.floor(Math.random()*(8*8-1));
        randomNumber < 10? randomNumber = "0" + randomNumber.toString(): randomNumber = randomNumber.toString()
        if(!minePositions.includes(randomNumber)){
            minePositions.push(randomNumber);
            i++;   
        }
    }
        console.log(minePositions);

      

}


generateGrid();








// const bombValue = document.querySelector<HTMLInputElement>("#noOfBombs");
// const levelSelected = document.querySelector<HTMLSelectElement>("#level");

/* const updateBombValue = (event: Event) =>{
    if(event.currentTarget === "beginner"){

    }
}; */

//levelSelected?.addEventListener("select",updateBombValue);


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
let interval: number;

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