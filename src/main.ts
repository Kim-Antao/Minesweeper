import './style.css'

const container = document.querySelector<HTMLDivElement>('.container__game-grid');

// to be changed later - dynamically set values based on level chosen
const noOfMines: number= 10;
const noOfRows: number =8;
const noOfCols: number =8;
///////////////////////////////////////////////////////
const noOfCells: number = noOfRows*noOfCols;
const minePositions: number[] = [];
let allPositions: string[];
let randomNumber: number | string;
//let checks: number;
let i: number=0;
let isTimerOn = false;
let isResultDisplayed = false;


const resultDisplay = document.querySelector<HTMLHeadingElement>(".container__result");

// const allPositions: string[] = Array.from({length:8},()=>Array(8).fill("safe")) as string;

if(!container ){
    throw new Error ("Encountered issue locating the main grid");
}
if(!resultDisplay){
    throw new Error ("Unable to locate h3 element to display result");
}


const generateGameGrid = () =>{
    allPositions = new Array(noOfCells).fill("safe");
    minePositions.length = 0;
    for(i=0; i<(noOfCells); i++){    
        container.innerHTML += `<div id="${i}" class="container__cell"></div>`;
    }
    
    
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
    
    
    for(i=0; i<noOfCells; i++){
        let minesAdjacent: number =0;
        const cell = document.getElementById(i.toString()) as HTMLDivElement;
    
        if(cell.classList.contains("mine")){
            cell.style.backgroundColor ="red";
        }
    
        if(cell.classList.contains("safe")){
            const gridEdge:number = i%noOfCols ;
            const bottomRow: number = noOfRows * (noOfCols-1);
    
            //check if mine above the cell
            if(i>noOfCols-1 && allPositions[i-noOfCols]=="mine"){minesAdjacent++;}
            //check if mine below the cell
            if(i<bottomRow && allPositions[i+noOfCols]=="mine"){minesAdjacent++;}
            // check if mine on its right
            if(gridEdge != (noOfCols-1) && allPositions[i+1]=="mine"){minesAdjacent++;}
            // check if mine on its left
            if(gridEdge != 0 && allPositions[i-1]=="mine"){minesAdjacent++;}
            // mine on bottom left diagonal
            if(gridEdge != 0 && i<bottomRow && (allPositions[i+noOfCols-1]=="mine")){minesAdjacent++;}
            // mine on bottom right diagonal
            if(gridEdge != (noOfCols-1) && i<bottomRow && (allPositions[i+noOfCols+1]=="mine")){minesAdjacent++;}
            // mine on top left diagonal
            if(i>(noOfCols-1) && gridEdge != 0 && (allPositions[i-noOfCols-1]=="mine")){minesAdjacent++;}
            // mine on top right diagonal
            if(i>(noOfCols-1) && gridEdge != (noOfCols-1) && (allPositions[i-noOfCols+1]=="mine")){minesAdjacent++;}
    
           
    
    /* 
            if(i>noOfCols && i<bottomRow && (gridEdge!=0) && (gridEdge!= (noOfCols-1))){   
                if(allPositions[i-noOfCols-1]=="mine"){minesAdjacent++;}
                if(allPositions[i-noOfCols+1]=="mine"){minesAdjacent++;}
                // if(allPositions[i+noOfCols-1]=="mine"){minesAdjacent++;}
                if(allPositions[i+noOfCols+1]=="mine"){minesAdjacent++;}
            }
             */
            /* 
            //check if the cells in the top row have a mine on its left 
            if(i<noOfCols && i>1 && allPositions[i-1]=="mine"){minesAdjacent++;}
            //check if the cells in the top row have a mine on its right 
            if(i<(noOfCols-1) && allPositions[i+1]=="mine"){minesAdjacent++;}
            
            //check if the cells on the left edge have a mine above it
            if(i>noOfCols &&(gridEdge ==0) && allPositions[i-noOfRows]=="mine"){minesAdjacent++;}
            //check if the cells on the left edge have a mine below it
            if(i<bottomRow &&(gridEdge ==0) && allPositions[i+noOfRows]=="mine"){minesAdjacent++;}
            
            // check if the cells on the right edge have a mine below it
            if(i<noOfCells-1 &&(gridEdge == (noOfCols-1)) && allPositions[i+noOfRows]=="mine"){minesAdjacent++;}
            // check if the cells on the right edge have a mine above it
            if(i<noOfCols &&(gridEdge == (noOfCols-1)) && allPositions[i-noOfRows]=="mine"){minesAdjacent++;}
            
            // check if the cell on the bottom row have a mine on its left 
            if(i>(bottomRow) && allPositions[i-1]=="mine"){minesAdjacent++;}
            //check if the cells  on the bottom row have a mine on its right 
            if(i>(bottomRow-1) &&(i%noOfCols == (noOfCols-1)) && allPositions[i+1]=="mine"){minesAdjacent++;}
           
            // check if the cell in the middle have mines around it
            // not top row, not bottom row,  not on the left,   not on the right edge
            if(i>noOfCols && i<bottomRow && (gridEdge!=0) && (gridEdge!= (noOfCols-1))){
                if(allPositions[i-1]=="mine"){minesAdjacent++;}
                if(allPositions[i+1]=="mine"){minesAdjacent++;}
                if(allPositions[i-noOfCols]=="mine"){minesAdjacent++;}
                if(allPositions[i+noOfCols]=="mine"){minesAdjacent++;}
                if(allPositions[i-noOfCols-1]=="mine"){minesAdjacent++;}
                if(allPositions[i-noOfCols+1]=="mine"){minesAdjacent++;}
                if(allPositions[i+noOfCols-1]=="mine"){minesAdjacent++;}
                if(allPositions[i+noOfCols+1]=="mine"){minesAdjacent++;}
            }
     */
            cell.setAttribute("data-mines-around", minesAdjacent.toString());
    
        }
    }
    const cells = document.querySelectorAll<HTMLDivElement>(".container__cell");
cells.forEach((cell)=>{
    cell.addEventListener('click', (cellClicked: Event) =>{

        if(!isTimerOn) interval = setInterval(updateTime,1000);
        handleCellClicked(cellClicked, cells);
    })
})  
}

generateGameGrid();


 

//console.log(cells);
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

//console.log(cells);

/* startButton?.addEventListener('click',()=>{
   interval = setInterval(updateTime,1000);
  // console.log("event listener called")
});
 */


restartButton?.addEventListener('click', ()=>{
    resetTimer();
    isTimerOn = false;
    container.innerHTML= "";
    generateGameGrid();
    if (isResultDisplayed && resultDisplay){
        console.log("reset")

        resultDisplay.style.display = "none";

    }
    isResultDisplayed = false;

})

const stopTimer = () =>{
    clearInterval(interval);

}

const resetTimer = () =>{
    stopTimer();
    secs = 0;
    mins = 0;
    timeCounter = 0;
    TimeDisplay.value = "00:00";
}

const handleCellClicked = (cellClicked: Event, cells: NodeListOf<HTMLDivElement>) =>{
//console.log(cellClicked.currentTarget);
// Do nothing if the game results are already displayed
    if(!isResultDisplayed){
        const isMineCell = (cellClicked.currentTarget as HTMLDivElement).className.includes("mine");
        const alreadyClicked = (cellClicked.currentTarget as HTMLDivElement).className.includes("container__cell--clicked");

        if(!alreadyClicked){
            console.log("cell clicked ", cellClicked.currentTarget);

            if(isMineCell){
                
                cells.forEach((cell)=>{
                    if(cell.className.includes("mine")){
                        cell.classList.add("container__cell--clicked");
                        cell.innerText = "💣";
                    }
                })
                resultDisplay.innerText = "GAME LOST!"
                resultDisplay.style.display = "block";
                isResultDisplayed = true;
                stopTimer();
                // is the below required to stop the function
                return;
        
            }else{
                
                (cellClicked.currentTarget as HTMLDivElement).innerText=  (cellClicked.currentTarget as HTMLDivElement).getAttribute("data-mines-around") as string;
                (cellClicked.currentTarget as HTMLDivElement).classList.add("container__cell--clicked");
            }
        }
    }
//user clicks on cell
    // if array [id of div clicked] === "mine"
           
            // show all hidden mines
    //if  [id of div clicked] < noOfCols && [id of div clicked]+noOfCols === "mine"
        //total++;
    // bottom row: if [id of div clicked] > length of array 
        //
    // left column
    // right column
    // all other cell
    

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