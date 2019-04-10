// your logic here
const game= {
    Level:0,
    score:0,
    preSelected:null,
    machingTime:false
}
         //****/part1:page layout****
//click the new game button to change main div to game level 1
document.getElementsByClassName("game-stats__button")[0].addEventListener("click", displayGame);

//display card layout for level#
function displayGame () {
    let level= game.Level;
    if (level===0) {
        document.getElementsByClassName("game-stats__button")[0].innerHTML="End Game";
        //change card layout to level--1
        game.level=1;
        changeLayout();
        // cardsSelect();//测试新函数
        // alert(cardsSelect());//验证用
        }
}
function changeLayout() {
    //remove instruction
    let par=document.getElementsByClassName("game-board");
    let chl=document.getElementsByClassName("game-instruction");
    par[0].removeChild(chl[0]);    
        //add card for level
    if (game.level===1) {
        par[0].style= "grid-template-columns:auto auto";
        const c=[];  
        cardsClass=cardsSelect();   
        for (let j=0;j<4;j++) {
            c[j]=document.createElement("div");
            c[j].innerHTML='<div class="card__face card__face--front"></div><div class="card__face card__face--back"></div>';
            par[0].appendChild(c[j]);        
            c[j].className=cardsClass[j%cardsClass.length];
            c[j].addEventListener("click",handleCard) //add flipped effection
        }
    }

} 

//cards pool generated
function cardsSelect() {
    let cardClass = "";
    let cardsPool=[];
    for (let i=0;i<2;i++) {
    switch (Math.floor(Math.random() *10)) {
        case 0:cardClass="card html5";break;
        case 1:cardClass="card css3";break;
        case 2:cardClass="card js";break;
        case 3:cardClass="card react";break;
        case 4:cardClass="card nodejs";break;
        case 5:cardClass="card sass";break;
        case 6:cardClass="card linkedin";break;
        case 7:cardClass="card heroku";break;
        case 8:cardClass="card github";break;
        case 9:cardClass="card aws";break;        
        }
      cardsPool.push(cardClass);
    }
     return  cardsPool;
}


//****/part2:match card****

function handleCard() {    
    if (game.machingTime) {return}
    this.classList.add("card--flipped")
    const currentSelected=this;
    //  check if the same card
    if (currentSelected===game.preSelected) {
        currentSelected.classList.remove('card--flipped');
        game.preSelected=null;
        return;
    } 
    // match cards
    if (game.preSelected) {
       if (game.preSelected.className===currentSelected.className) {
           unHandleCard(game.preSelected);
           unHandleCard(currentSelected);
           game.preSelected=null;
           return;
        }
        // wrong cards
        game.machingTime=true;
        setTimeout(() => {
            currentSelected.classList.remove('card--flipped');
            game.preSelected.classList.remove('card--flipped');
            game.preSelected=null;
            game.machingTime=false;
        }, 1000);
        return;
    }
    game.preSelected=currentSelected;
    }
    //remove "click"event from card
function unHandleCard(card) {
    card.removeEventListener("click",handleCard)
}
