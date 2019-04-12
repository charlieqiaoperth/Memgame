// your logic here
const game= {    
    level:0,
    score:0,
    preSelected:null,
    machingTime:false,
    start:false,
    timeLeft:10,
    matched:0,
    barWidth:null
}

         //****/part1:page layout****
//click the new game button to change main div to game level 1
document.getElementsByClassName("game-stats__button")[0].addEventListener("click", displayGame);

//display card layout for level#
function displayGame () {
     //stop game
     if (game.start) {        
        document.getElementsByClassName("game-stats__button")[0].innerHTML="New Game";
        alert(`Congratulation your score is ${game.score}`);
        let cards=document.getElementsByClassName("card");        
        for (let a=0;a<cards.length;a++) {cards[a].removeEventListener("click",handleCard)};        
        game.level=0;             
        game.start=false;             
        return;
    }    else {
         //star game
        document.getElementsByClassName("game-stats__button")[0].innerHTML="End Game";
        game.start=true;
        game.level=1;
        game.matched=0;
        game.score=0;
        document.getElementsByClassName("game-stats__score--value")[0].innerHTML=game.score; 
        game.timeLeft=60;                     
        changeLayout(game.level);
        timeControl();                   
       }
        return;   
}
//change layout belong to level#
function changeLayout(change) {    
    let par=document.getElementsByClassName("game-board");  
    const c=[]; 
    let cardLayout;  
    game.timeLeft=60; 
    document.getElementsByClassName("game-timer__bar")[0].innerHTML=`${game.timeLeft}S`;
    while (par[0].firstChild) {
        par[0].removeChild(par[0].firstChild);//clear old card ,ready to new card layout
        }
        //change for different level
    switch (change) {        
        case 1:            
        { 
            // while (par[0].firstChild) {par[0].removeChild(par[0].firstChild);};
            document.getElementsByClassName("game-stats__level--value")[0].innerHTML=game.level;
            par[0].style= "grid-template-columns:auto auto";         
            cardsClass=cardsSelect(game.level);   
            cardLayout=2*2;
            for (let j=0;j<cardLayout;j++) {
            c[j]=document.createElement("div");
            c[j].innerHTML='<div class="card__face card__face--front"></div><div class="card__face card__face--back"></div>';
            par[0].appendChild(c[j]);        
            c[j].className=cardsClass[j];
            c[j].addEventListener("click",handleCard) //add flipped effection
            }  
            // cardsCss();   
        };break;
        case 2:            
        { 
            document.getElementsByClassName("game-stats__level--value")[0].innerHTML=game.level;
            par[0].style= "grid-template-columns:auto auto auto auto";         
            cardsClass=cardsSelect(game.level);   
            cardLayout=4*4;
            for (let j=0;j<cardLayout;j++) {
            c[j]=document.createElement("div");
            c[j].innerHTML='<div class="card__face card__face--front"></div><div class="card__face card__face--back"></div>';
            par[0].appendChild(c[j]);        
            c[j].className=cardsClass[j];
            c[j].addEventListener("click",handleCard) //add flipped effection
            }
        };break;
        case 3:            
        { 
            document.getElementsByClassName("game-stats__level--value")[0].innerHTML=game.level;
            par[0].style= "grid-template-columns:auto auto auto auto auto auto";         
            cardsClass=cardsSelect(game.level);   
            cardLayout=6*6;
            for (let j=0;j<cardLayout;j++) {
            c[j]=document.createElement("div");
            c[j].innerHTML='<div class="card__face card__face--front"></div><div class="card__face card__face--back"></div>';
            par[0].appendChild(c[j]);        
            c[j].className=cardsClass[j];
            c[j].addEventListener("click",handleCard) //add flipped effection
            }
        };break;
    
    }
} 
// function cardsCss () {    
//         for (let j=0;j<cardLayout;j++) {
//             c[j]=document.createElement("div");
//             c[j].innerHTML='<div class="card__face card__face--front"></div><div class="card__face card__face--back"></div>';
//             par[0].appendChild(c[j]);        
//             c[j].className=cardsClass[j];
//             c[j].addEventListener("click",handleCard) //add flipped effection
//         }
// }
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
    //  cardsPool=cardsPool.concat(cardsPool);    
     cardsPool=shuffleCards(cardsPool.concat(cardsPool));        
     return  cardsPool;
}
function shuffleCards(arr) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
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
           if (game.level===1)  {
               game.matched+=1;
               game.score+=game.level**2*game.timeLeft;
               document.getElementsByClassName("game-stats__score--value")[0].innerHTML=game.score;
               if (game.matched>1) {game.matched=0;game.level=2;changeLayout(game.level)}
            } 
            if (game.level===2)  {
                game.matched+=1;
                game.score+=game.level**2*game.timeLeft;
                document.getElementsByClassName("game-stats__score--value")[0].innerHTML=game.score;
                if (game.matched>8) {game.matched=0;game.level=3;changeLayout(game.level)}
             }
             if (game.level===3)  {
                game.matched+=1;
                game.score+=game.level**2*game.timeLeft;
                document.getElementsByClassName("game-stats__score--value")[0].innerHTML=game.score;
                if (game.matched>18) {game.matched=0;alert(`Congratulation your score is ${game.score}`)}
             }        
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
            ///part3 time control
//time control
function timeControl() {
    // game.timeLeft=60;
    if (game.timeLeft===0) {
        document.getElementsByClassName("game-stats__button")[0].innerHTML="New Game";
        alert(`Congratulation your score is ${game.score}`);
        let cards=document.getElementsByClassName("card");        
        for (let a=0;a<cards.length;a++) {cards[a].removeEventListener("click",handleCard)}; 
        game.level=0;         
        game.start=false; 
        return;
    } else {
        if (game.start) {
        setTimeout(() => {
            game.timeLeft--;            
            document.getElementsByClassName("game-timer__bar")[0].innerHTML=`${game.timeLeft}S`;             
            game.barWidth=Math.floor(100*game.timeLeft/60)+'%';                 
            document.getElementsByClassName("game-timer__bar")[0].style.width=`${game.barWidth}`;
            timeControl();
            }, 1000);
        }
    } 
}

