import './style.css'

const container = document.querySelector<HTMLDivElement>('.container__game-grid');
const resultDisplay = document.querySelector<HTMLHeadingElement>(".container__result");
const level = document.querySelector<HTMLSelectElement>('#level');


if(!container ){
    throw new Error ("Encountered issue locating the main grid");
}
if(!resultDisplay){
    throw new Error ("Unable to locate h3 element to display result");
}
if(!level){
    throw new Error ("Element for level selection cannot be located");
}

const minePositions: number[] = [];
let allPositions: string[];
let randomNumber: number;
//let checks: number;
let i: number=0;
let isTimerOn = false;
let isResultDisplayed = false;
// let levelSelected = "beginner";
let noOfMines: number= 10;
let noOfRows: number =8;
let noOfCols: number =8;

let noOfCells: number = noOfRows*noOfCols;
let levelSelected: string = level.value;





level.addEventListener('change', ()=>{
    levelSelected = level.value;
    generateGameGrid();
})


const generateGameGrid = () =>{

    container.innerHTML= "";

    if(resultDisplay.classList.contains("container__result--lost")){
        resultDisplay.classList.remove("container__result--lost");
    }else if(resultDisplay.classList.contains("container__result--won")){
        resultDisplay.classList.remove("container__result--won");
    }

    if(levelSelected == "beginner"){
        noOfRows = 8;
        noOfCols = 8;
        noOfMines = 10;
       

        
    }else if(levelSelected == "intermediate"){
        noOfRows = 12;
        noOfCols = 12;
        noOfMines = 24;
        // generateGameGrid();

    }else if(levelSelected == "expert"){
        noOfRows = 18;
        noOfCols = 18;
        noOfMines = 60;
        
        // generateGameGrid();
    }
    document.documentElement.style.setProperty('--noOfCols', noOfCols.toString());
    noOfCells = noOfRows*noOfCols;
    console.log(noOfCells);

    allPositions = new Array(noOfCells).fill("safe");

    minePositions.length = 0;
    for(i=0; i<(noOfCells); i++){    
        container.innerHTML += `<div id="${i}" class="container__cell"></div>`;
    }
    
    
    i = 0;    
    while( i < noOfMines){
        randomNumber = Math.floor(Math.random()*(noOfCells-1));
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
    
           
            cell.setAttribute("data-mines-around", minesAdjacent.toString());
    
        }
    }
    const cells = document.querySelectorAll<HTMLDivElement>(".container__cell");
cells.forEach((cell)=>{
    cell.addEventListener('click', (cellClicked: Event) =>{

        if(!isTimerOn) interval = setInterval(updateTime,1000);
        handleCellClicked(cellClicked.currentTarget as HTMLDivElement, cells);
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
    // 
    ( document.querySelector("#restartButton")as HTMLButtonElement).innerText= "🙂";
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

const handleEmptyCellClicked = (cellClicked, cells) => {
    const currentLocation: number = parseInt(cellClicked.getAttribute("id") as string);
                let newLocation: number = 0;
                const gridEdge:number = currentLocation%noOfCols ;
                const bottomRow: number = noOfRows * (noOfCols-1);
    if(gridEdge!=0) {
        newLocation = currentLocation-1;
        const newCell = document.getElementById(newLocation.toString()) as HTMLDivElement;
        handleCellClicked(newCell,cells);
    }

    if(gridEdge!=(noOfCols-1)){
        newLocation = currentLocation+1;
        const newCell = document.getElementById(newLocation.toString()) as HTMLDivElement;
        handleCellClicked(newCell,cells);
    }
    if(currentLocation>(noOfCols-1)){
        newLocation = currentLocation-noOfCols;
        const newCell = document.getElementById(newLocation.toString()) as HTMLDivElement;
        handleCellClicked(newCell,cells);
    }
        
    if(currentLocation<bottomRow){
        newLocation = currentLocation+noOfCols;
        const newCell = document.getElementById(newLocation.toString()) as HTMLDivElement;
        handleCellClicked(newCell,cells);
    }
}


const handleCellClicked = (cellClicked: HTMLDivElement, cells: NodeListOf<HTMLDivElement>) =>{
//console.log(cellClicked.currentTarget);
// Do nothing if the game results are already displayed
    if(!isResultDisplayed){
        const isMineCell = cellClicked.className.includes("mine");
        const alreadyClicked = cellClicked.className.includes("container__cell--clicked");
        const allClickedCells = document.querySelectorAll(".container__cell--clicked");
        let totalSafeCellClicked: number = 0;
        // let zeroSafeCell: boolean = false;
       
        // cells.forEach((cell)=>{
        //     if (cell.classList.contains("safe")&& alreadyClicked){
        //      zeroSafeCell = true;
        //     }

        //  })

        if(!alreadyClicked){
           // console.log("cell clicked ", cellClicked.currentTarget);

            if(isMineCell){
                
                cells.forEach((cell)=>{
                    if(cell.className.includes("mine")){
                        cell.classList.add("container__cell--clicked");
                        cell.innerText = "💣";
                    }
                })
                resultDisplay.innerText = "GAME LOST!"
             //   resultDisplay.style.display = "block";
                resultDisplay.classList.add("container__result--lost");
               ( document.querySelector("#restartButton")as HTMLButtonElement).innerText= "😵";
                isResultDisplayed = true;
                stopTimer();
                // is the below required to stop the function
                return;
        
            }else{
                const totalMines: number=  parseInt(cellClicked.getAttribute("data-mines-around") as string);
                // console.log(totalMines)
               if (totalMines!=0) {
                cellClicked.innerText= totalMines.toString();
                cellClicked.classList.add("container__cell--clicked");
               

               } else{
              //  console.log("0 mine adjacent")
              cellClicked.classList.add("container__cell--clicked");
                
                // setTimeout(handleEmptyCellClicked(cellClicked, cells),10)
                handleEmptyCellClicked(cellClicked, cells);
               }
               
               cells.forEach((cell)=>{
                if(cell.classList.contains("safe")){
                    if(cell.classList.contains("container__cell--clicked")){
                        totalSafeCellClicked++;
                    }
                }
               })

               if(totalSafeCellClicked == (noOfCells-noOfMines)){
               // console.log("All cleared")
               resultDisplay.innerText = "GAME WON"
           //    resultDisplay.style.display = "block";
               resultDisplay.classList.add("container__result--won");
             
               ( document.querySelector("#restartButton")as HTMLButtonElement).innerText= "🥳";
               isResultDisplayed = true;
               stopTimer();
               return;
               }

               
                }
            }

         /*    cells.forEach((cell)=>{
                if (cell.classList.contains("safe")&& allClickedCells){
                    // console.log("In the loop")
                    totalSafeCellClicked++;
                }
                console.log(totalSafeCellClicked)
                
             })
             if(totalSafeCellClicked == noOfCells-noOfMines){
                resultDisplay.innerText = "GAMe WON!"
                resultDisplay.style.display = "block";
               //( document.querySelector("#restartButton")as HTMLButtonElement).innerText= "";
                isResultDisplayed = true;
                stopTimer();
                // is the below required to stop the function
                return;
        
        } */
    
    
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

// END OF HANDLE CELL CLICKED
/* const checkAdjacentCell = (currentCell: HTMLDivElement)=>{
    const currentLocation:number = parseInt(currentCell.getAttribute("id") as string);
    const gridEdge:number = currentLocation%noOfCols ;
    const bottomRow: number = noOfRows * (noOfCols-1);
    if(gridEdge!=0)
} */
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