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

