import {rules} from "../data/help";

export const displayHelp = () =>{
   const helpCard = document.querySelector<HTMLDivElement>(".container__help-info") as HTMLDivElement;
   if(helpCard.innerHTML == ""){
        helpCard.innerHTML = `
        <h3> <u> HOW TO PLAY </u> </h3>
        <p> ${rules} </p>`;
        helpCard.style.display = "block";
   }else{
        helpCard.innerHTML = "";
        helpCard.style.display = "none";
    }
};