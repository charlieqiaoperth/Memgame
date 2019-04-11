// your logic here
const game= {
    haha:null,
    level:0,
    score:0,
    preSelected:null,
    machingTime:false,
    start:false
}

         //****/part1:page layout****
//click the new game button to change main div to game level 1
document.getElementsByClassName("game-stats__button")[0].addEventListener("click", displayGame);

//display card layout for level#
function displayGame () {
     //end game???????
     if (game.start) {        
        document.getElementsByClassName("game-stats__button")[0].innerHTML="New Game";
        // countScore();
        alert(game.score);
        game.start=false;        
        return;
    }    else {
         //star game
        document.getElementsByClassName("game-stats__button")[0].innerHTML="End Game";
        game.start=true;
        game.level=3;
        //change card layout to level--1        
        changeLayout(game.level);                   
       }
        return;   
}
//change layout belong to level#
function changeLayout(change) {
    //remove all childnode from class "game-board"
    // let par=document.getElementsByClassName("game-board");
    // let chl=document.getElementsByClassName("card");
    //     chl.forEach(card => { function() {
    //         par[0].removeChild(card)}
    //     });

    // let chl=document.getElementsByClassName("card");
    // if (chl.parentNode) {
    //     chl.parentNode.removeChild(chl);
    //     }
    
    let par=document.getElementsByClassName("game-board");  
    const c=[]; 
    let cardLayout;
    // if (change=1) {cardLayout=2*2/2} else if (change=2) {cardNum=4*4/2} else (change=6*6/2);      
    // if (gameLevel=1) {cardLayout=2*2/2} else if (gameLevel=2) {cardNum=4*4/2} else (cardNum=6*6/2);      
        while (par[0].firstChild) {
        par[0].removeChild(par[0].firstChild);
        }
        //change for different level
    switch (change) {
              
        case 1:            
        { par[0].style= "grid-template-columns:auto auto";         
        cardsClass=cardsSelect(game.level);   
        cardLayout=2*2;
        for (let j=0;j<cardLayout;j++) {
            c[j]=document.createElement("div");
            c[j].innerHTML='<div class="card__face card__face--front"></div><div class="card__face card__face--back"></div>';
            par[0].appendChild(c[j]);        
            c[j].className=cardsClass[j%cardsClass.length];
            c[j].addEventListener("click",handleCard) //add flipped effection
        }
        };break;
        case 2:            
        { par[0].style= "grid-template-columns:auto auto auto auto";         
        cardsClass=cardsSelect(game.level);   
        cardLayout=4*4;
        for (let j=0;j<cardLayout;j++) {
            c[j]=document.createElement("div");
            c[j].innerHTML='<div class="card__face card__face--front"></div><div class="card__face card__face--back"></div>';
            par[0].appendChild(c[j]);        
            c[j].className=cardsClass[j%cardsClass.length];
            c[j].addEventListener("click",handleCard) //add flipped effection
        }
        };break;
        case 3:            
        { par[0].style= "grid-template-columns:auto auto auto auto auto auto";         
        cardsClass=cardsSelect(game.level);   
        cardLayout=6*6;
        for (let j=0;j<cardLayout;j++) {
            c[j]=document.createElement("div");
            c[j].innerHTML='<div class="card__face card__face--front"></div><div class="card__face card__face--back"></div>';
            par[0].appendChild(c[j]);        
            c[j].className=cardsClass[j%cardsClass.length];
            c[j].addEventListener("click",handleCard) //add flipped effection
        }
        };break;
    
    }
} 
//点击end后保持状态，并且积分
function CountScore() {
    //remove instruction
    // let par=document.getElementsByClassName("game-board");
    // let chl=document.getElementsByClassName("game-instruction");
    // par[0].removeChild(chl[0]);    
    let cardsAll=document.getElementsByClassName("card");
        // cardsAll.forEach(c => {c.classList.remove("card--flipped")})
        for (let i=0;i<cardsAll.length;i++) {
            unHandleCard(cardcardsAll[i])
        }
        return;
        // cardsAll.forEach(c => {unHandleCard(c)});
}


//cards pool generated
function cardsSelect(gameLevel) {
    let cardClass = "";
    let cardsPool=[];
    let cardNum;
    if (gameLevel===1) {cardNum=2} else if (gameLevel===2) {cardNum=8} else (cardNum=18);
    for (let i=0;i<cardNum;i++) {
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
