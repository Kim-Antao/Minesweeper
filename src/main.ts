import './style.css'
import { displayHelp } from './asset/scripts/help';

// QUERY SELECTORS  
const container = document.querySelector<HTMLDivElement>('.container__game-grid');
const resultDisplay = document.querySelector<HTMLHeadingElement>(".container__result");
const level = document.querySelector<HTMLSelectElement>('#level');
const mineDisplay = document.querySelector<HTMLInputElement>('#noOfBombs');
const restartButton = document.querySelector<HTMLButtonElement>("#restartButton");
const timeDisplay = document.querySelector<HTMLInputElement>("#timerBox");
const helpButton = document.querySelector<HTMLButtonElement>(".container__help-button")

if(!container ){
    throw new Error ("Encountered issue locating the main grid");
}
if(!resultDisplay){
    throw new Error ("Encountered issue locating the h3 element to display result");
}
if(!restartButton){
    throw new Error ("Encountered issue locating the restart button element");
}
if(!helpButton){
    throw new Error("Encountered issue locating the help button element");
}
if(!level){
    throw new Error ("Encountered issue locating the element for level selection");
}
if(!mineDisplay){
    throw new Error ("Encountered issue locating the element to display number of mines");
}
if(!timeDisplay){
    throw new Error("Encountered issue locating the timer input element");
}


// VARIABLE INITIALISATION

const minePositions: number[] = [];
let allPositions: string[];
let randomNumber: number;
let i: number=0;
let isTimerOn = false;
let isResultDisplayed = false;
let noOfMines: number;
let noOfRows: number;
let noOfCols: number; 
let noOfCells: number;
let levelSelected: string = level.value;
let secs: number | string = 0;
let mins: number | string= 0;
let timeCounter: number = 0;
let interval: number;


// FUNCTIONS
const generateGameGrid = () =>{

    container.innerHTML= "";

    if(levelSelected == "beginner"){
        noOfRows = 9;
        noOfCols = 9;
        noOfMines = 10;
    }else if(levelSelected == "intermediate"){
        noOfRows = 12;
        noOfCols = 12;
        noOfMines = 24;
    }else if(levelSelected == "expert"){
        noOfRows = 18;
        noOfCols = 18;
        noOfMines = 60;
    }
    
    document.documentElement.style.setProperty('--noOfCols', noOfCols.toString());

    // Below is intended to use to style the grid based on level selected
    //document.documentElement.style.setProperty('--level',levelSelected);

    noOfCells = noOfRows*noOfCols;
    mineDisplay.value = noOfMines.toString();
    allPositions = new Array(noOfCells).fill("safe");

    //creating the grid
    minePositions.length = 0;
    for(i=0; i<(noOfCells); i++){    
        container.innerHTML += `<div id="${i}" class="container__cell"></div>`;
    }
    
    //generating random positions for mines
    i = 0;    
    while( i < noOfMines){
        randomNumber = Math.floor(Math.random()*(noOfCells-1));
        if(!minePositions.includes(randomNumber)){
            minePositions.push(randomNumber);
            allPositions[randomNumber] = "mine";    
            i++;   
        }
    }

    //assigning mine or safe values to all cells
    for(i =0; i < noOfCells ; i++){
        let cell = (document.getElementById(`${i}`) as HTMLDivElement);
        cell.classList.add(allPositions[i]);
    }
    
    //calculate the mines around
    for(i=0; i<noOfCells; i++){
        let minesAdjacent: number =0;
        const cell = document.getElementById(i.toString()) as HTMLDivElement;
    
        if(cell.classList.contains("mine")){
           // cell.style.backgroundColor ="red";
           cell.innerText ="M";
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
        
        // Event listener for left click
        cell.addEventListener('click', (cellClicked: Event) =>{
            if(!isTimerOn && !isResultDisplayed) interval = setInterval(updateTime,1000);
            handleCellClicked(cellClicked.currentTarget as HTMLDivElement, cells);
        })
    
        // Event listener for right click
        cell.addEventListener('contextmenu', (rightClick: Event)=>{
            rightClick.preventDefault();
            handleRightClick(rightClick.currentTarget as HTMLDivElement);
        });
    })  
}

const handleRightClick = (rightClick: HTMLDivElement) =>{
    if(!isTimerOn && !isResultDisplayed) interval = setInterval(updateTime,1000);
    if(!rightClick.classList.contains("container__cell--clicked")){
        if (!rightClick.classList.contains("flag")) {
            rightClick.classList.add("flag");
            rightClick.innerText = "🚩";
            noOfMines--;

        }else{
            rightClick.classList.remove("flag");
            rightClick.innerText = "";
            noOfMines++;
        }
        mineDisplay.value = noOfMines.toString();
    }
}

const handleEmptyCellClicked = (cellClicked: HTMLDivElement, cells: NodeListOf<HTMLDivElement>) => {
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
    if(!isResultDisplayed){
        const isMineCell = cellClicked.className.includes("mine");
        const alreadyClicked = cellClicked.className.includes("container__cell--clicked");
        const flaggedCell = cellClicked.className.includes("flag");
        let totalSafeCellClicked: number = 0;
        
        if(!alreadyClicked && !flaggedCell){
            if(isMineCell){             
                cells.forEach((cell)=>{
                    if(cell.className.includes("mine")){
                        cell.classList.add("container__cell--clicked");
                        cell.innerText = "💣";
                        cell.style.backgroundColor ="red";
                    }
                })
                resultDisplay.innerText = "GAME LOST !"
                resultDisplay.classList.add("container__result--lost");
                (document.querySelector("#restartButton")as HTMLButtonElement).innerText= "😵";
                isResultDisplayed = true;
                stopTimer();
                return;
        
            }else{
                
                const totalMines: number=  parseInt(cellClicked.getAttribute("data-mines-around") as string);
                cellClicked.classList.add("container__cell--clicked");
                
                totalMines!=0 ? cellClicked.innerText= totalMines.toString() : handleEmptyCellClicked(cellClicked, cells);

                cells.forEach((cell)=>{
                    if(cell.classList.contains("safe")){
                        if(cell.classList.contains("container__cell--clicked")){
                            totalSafeCellClicked++;
                        }
                    }
                })

                // check is all safe cell have been flipped
                if(totalSafeCellClicked == (noOfCells-noOfMines)){
                    resultDisplay.innerText = "GAME WON !!"
                    resultDisplay.classList.add("container__result--won");
                    
                    ( document.querySelector("#restartButton")as HTMLButtonElement).innerText= "🥳";
                    isResultDisplayed = true;
                    stopTimer();
                    return;
                }
            }  
        }
    }

}

const resetGameContainer = () =>{
    (document.querySelector("#restartButton")as HTMLButtonElement).innerText= "🙂";

    if(resultDisplay.classList.contains("container__result--lost")){
        resultDisplay.classList.remove("container__result--lost");
    }else if(resultDisplay.classList.contains("container__result--won")){
        resultDisplay.classList.remove("container__result--won");
    }

    isResultDisplayed=false;
}

const stopTimer = () =>{
    clearInterval(interval);
}

const resetTimer = () =>{
    stopTimer();
    secs = 0;
    mins = 0;
    timeCounter = 0;
    timeDisplay.value = "00:00";
    isTimerOn = false;
}

const updateTime = () =>{
    isTimerOn = true;
    secs = Math.floor(timeCounter % 60);
    mins = Math.floor((timeCounter/60)%60);
    if (secs < 10){
        secs = "0" + secs.toString();
    }
    if(mins < 10){
        mins = "0" + mins.toString();
    }
    timeDisplay.value = `${mins}:${secs}`;
    timeCounter++;
}
 

// MAIN FUNCTION CALL

generateGameGrid();


// EVENT LISTENERS

helpButton.addEventListener('click', displayHelp);

level.addEventListener('change', ()=>{
    levelSelected = level.value;
    resetTimer();
    resetGameContainer();
    generateGameGrid();
});

restartButton.addEventListener('click', ()=>{
    resetTimer();
    resetGameContainer();
    generateGameGrid();

});