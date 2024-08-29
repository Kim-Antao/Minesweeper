import './style.css'

let container = document.querySelector<HTMLDivElement>('.container__game-grid');

// to be changed later - dynamically set values based on level chosen
const noOfMines: number= 10;
const noOfRows: number =8;
const noOfCols: number =8;
///////////////////////////////////////////////////////
const noOfCells: number = noOfRows*noOfCols;
const minePositions: number[] = [];
let allPositions: string[] = new Array(noOfCells).fill("safe");
let randomNumber: number | string;
//let checks: number;
let i: number=0;
let isTimerOn = false;
let isResultDisplayed = false;

// const allPositions: string[] = Array.from({length:8},()=>Array(8).fill("safe")) as string;

if(!container ){
    throw new Error ("Encountered issue locating the main grid");
}

for(i=0; i<(noOfCells); i++){    
    container.innerHTML += `<div id="${i}" class="container__cell"></div>`;
}

const cells = document.querySelectorAll<HTMLDivElement>(".container__cell");

i = 0;    
while( i < noOfMines){
    randomNumber = Math.floor(Math.random()*(noOfCells-1));
  //  checks = randomNumber;
  //  randomNumber < 10? randomNumber = "0" + randomNumber.toString(): randomNumber = randomNumber.toString()
  if(!minePositions.includes(randomNumber)){
        minePositions.push(randomNumber);
        allPositions[randomNumber] = "mine";    
        i++;   
    }

}

for(i =0; i < noOfCells ; i++){
    let cell = (document.getElementById(`${i}`) as HTMLDivElement);
    cell.classList.add(allPositions[i]);
}


        

console.log(cells);
const restartButton = document.querySelector<HTMLButtonElement>("#restartButton");
//const cells = document.querySelectorAll<HTMLDivElement>(".container__cell");
const TimeDisplay = document.querySelector<HTMLInputElement>("#timerBox");

let secs: number | string = 0;
let mins: number | string= 0;
let timeCounter: number = 0;
let interval: number;

if(!TimeDisplay){
    throw new Error("Unable to find the timer input element");
}

const updateTime = () =>{
   // console.log("here");
   isTimerOn = true;
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

cells.forEach((cell)=>{
    cell.addEventListener('click', (cellClicked: Event) =>{

        console.log("cell clicked");
        if(!isTimerOn) interval = setInterval(updateTime,1000);
        handleCellClicked(cellClicked);
    })
})
/* startButton?.addEventListener('click',()=>{
   interval = setInterval(updateTime,1000);
  // console.log("event listener called")
});
 */
const resultDisplay = document.querySelector<HTMLHeadingElement>(".container__result");


restartButton?.addEventListener('click', ()=>{
    resetTimer();
    isTimerOn = false;
    if (isResultDisplayed && resultDisplay){
        console.log("reset")

        resultDisplay.style.display = "none";

    }
})

const resetTimer = () =>{
    clearInterval(interval);
    secs = 0;
    mins = 0;
    timeCounter = 0;
    TimeDisplay.value = "00:00";
}

const handleCellClicked = (cellClicked: Event) =>{
 //console.log(cellClicked.currentTarget);
    const safeCell = (cellClicked.currentTarget as HTMLDivElement).className.includes("safe");
    const mineCell = (cellClicked.currentTarget as HTMLDivElement).className.includes("mine");
   
    if(mineCell){
        if(!resultDisplay){
            throw new Error ("Unable to locate h3 element to display result");
        }
/////////////////////// reveal all bombs
/////////////////////// disable click function on cells
        resultDisplay.innerText = "GAME LOST!"
        resultDisplay.style.display = "block";
        isResultDisplayed = true;
        resetTimer();

    }
   
//user clicks on cell
    // if array [id of div clicked] === "mine"
            // game lost
            // display message 
            // stop timer
            // show all hidden mines
    //if  [id of div clicked] < noOfCols && [id of div clicked]+noOfCols === "mine"
        //total++;
    // bottom row: if [id of div clicked] > length of array 
        //
    // left column
    // right column
    // all other cell


    if(safeCell){

    }

    //console.log(cellClicked.currentTarget, cellType);
    
};



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