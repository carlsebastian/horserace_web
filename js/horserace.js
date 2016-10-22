function pageLoad(func) {
    // assign any pre-defined functions on 'window.onload' to a variable
    var oldOnLoad = window.onload;
    // if there is not any function hooked to it
    if (typeof window.onload != 'function') {
        // you can hook your function with it
        window.onload = func;
    } else { // someone already hooked a function
        window.onload = function () {
            // call the function hooked already
            oldOnLoad();
            // call your awesome function
            func;
        }
    }
}

// pass the function you want to call at 'window.onload', in the function defined above
pageLoad(function(){
    //should not be there..
    var content = document.getElementById("wrapper").innerHTML;
    document.getElementById("wrapper").innerHTML = "<a href='index.html'><button id='restart'>Omstart</button></a>"+content;
    document.getElementById("restart").addEventListener("click", function(){document.location.reload(true)}, false);

    //
    initiateTableButtons("pick_cards", "div", 0,4, "pickSuit", pickSuit);
    initiateTableButtons("pick_round_amount", "td", 0,12, "rounds", pickRounds);
    document.getElementById("draw_card").addEventListener("click", function(){ card(); }, false);
    //buttons
    
    //document.getElementById("draw_card").onclick = ;


    document.getElementById("pick_round_amount_back").addEventListener("click", page1, false);
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    document.getElementById("board").classList.toggle("hidden");
    splash(1, "Väkommen till Horserace!", "splash");

    //debugfunction
    //debug();
});

function debug(){
    document.getElementById("status").innerHTML = "DEBUG MODE, remove debug from pageLoad to fix";

    suits=[1,1,1,1];
    console.log(suits);
    console.log(cardDeck);
    createDeck(47);
    //testDeck();
    // for (var i = 0; i < 10; i++){
    //     console.log(checkColour( -1));
    // }
    document.getElementById("status").innerHTML = "DEBUG MODE, remove debug from pageLoad to fix";
}

function checkColour(card){
    var position = 0;
    switch (card){
        case (card > 35):
            position = 3;
            break; 
        case (card > 24):
            position = 2;
            break;
        case (card > 11):
            position = 1;
            break;
        case (card > 0):
            position = 0;
            break;
        default: 
            position = -1;
            break; 
    }
    return position;
}

function card(){
    console.log("card", cardDeck.length);
    var card = 0;
    if ( cardDeck.length > 0 ){
        card = drawCard();
        document.getElementById("board_cards").innerHTML += "<img src='"+showCard("images/cards","card",card,"",".jpg")+"' alt='card"+card+"'>";
    }
    console.log("card", cardDeck.length);
    document.getElementById("draw_card").addEventListener("click", card, false);
}

var rounds = -1;
var suits = [0, 0, 0, 0];
var cardDeck = null;
var cardDeckLeft = -1;


function changeHTML(divid, text, add){
    if (add) {
        document.getElementById(divid).innerHTML += text;
    }
    else {
        document.getElementById(divid).innerHTML = text;
    }
}

function initiateTableButtons(element, name, startSize, size, id, func){
    console.log("loaded");
    var table = document.getElementById(element); 
    var cells = table.getElementsByTagName(name); 
    for (var i = startSize; i < size; i++) {
        cells[i].id = id+i;
        cells[i].addEventListener("click", func, false);
    }
}

function toggleClass(el, classy){
    el.classList.toggle(classy);
}

function pickRounds(){
    toggleClass(this, "active");
    rounds=parseInt(this.id.match(/\d+/), 10)+1;
    console.log(rounds);
    checkPickRounds();
}

function checkPickRounds(){
    if (rounds > 0){
        changeHTML("status",("Du har valt "+rounds+" kort. Tryck vidare för att börja spela"),false);
        document.getElementById("pick_round_amount_next").addEventListener("click", page3, false);
    }
    else {
        changeHTML("status","Välj antal kort som ska spelas", false);
        document.getElementById("pick_round_amount_next").removeEventListener("click", page3, false);
    }
}

//var suits =[h='0', d='0', c='0', s='0']; 
function pickSuit(){
    toggleClass(this, "active");
    position = this.id.match(/\d/)[0];
    if (suits[position]==1){
        suits[position]=0;
    } else{
        suits[position]=1;
    }
    console.log("added!",this.id, suits[position], suits);
    checkPickSuit();
}

function countPickSuit(){
    var len = 0;
    for (var i = 0; i<suits.length; i++){
        if (suits[i]>0){
            len++;
        }
    }
    return len;
}

function checkPickSuit(){
    var len = countPickSuit();
    if (len==0 ){
        changeHTML("status","Välj minst två valörer för att fortsätta",false);
        document.getElementById("pick_cards_next").removeEventListener("click", page2, false);
    }
    if (len == 1){
        changeHTML("status", "Välj en till valör", false);
        document.getElementById("pick_cards_next").removeEventListener("click", page2, false);
    }
    if (len > 1){
        changeHTML("status", "Välj fler valörer eller gå vidare", false);
        document.getElementById("pick_cards_next").addEventListener("click", page2, false);
    }
    if (len == 4){
        changeHTML("status", "Gå vidare", false);
        document.getElementById("pick_cards_next").addEventListener("click", page2, false);
    }
}

 //splashscreen for displaying temporary messages
function splash(time, message, div){
    var el = document.getElementById(div);
    el.innerHTML = message;
    el.classList.toggle("hidden");
    window.setTimeout(function(){el.classList.toggle("hidden")}, time);

}

function showCard(folder, prefix,number, infix, suffix){
    return folder+"/"+prefix+number+infix+suffix;
}

function createDeck(size){
    cardDeck = new Array( size );
    console.log(cardDeck);
    cardDeckLeft = size;
    var control=0;
    var add = 0;

    for (var i=0; i < cardDeck.length; i ++ ){
        if (i%12 == 0){
            if (suits[control] == 0){
                while (suits[control] == 0){
                    control ++;
                    add += 12;
                    // console.log("add: ", add);
                    // console.log("control: ", control);
                }
            }
            control++;
        }
        cardDeck[i] = i+add;
        // //if (i%10 != 0){
        //     cardDeck[i] = i+add;
        // //}
        
    }

    console.log(cardDeck);
    // while (cardDeck.length > 0){
    //     console.log(showCard("images/cards","card",drawCard(),"",".jpg"));
    // }
    // console.log(cardDeck.length);
}

function drawCard(){
    console.log("drawCard", cardDeck.length);
    var cardsLeft = cardDeck.length;
    if ( cardsLeft == 0){
        return null;
    }
    cardDeckLeft--;
    changeHTML("status",(cardDeckLeft+" kort kvar"),false);
    console.log("drawCard", cardDeck.length);
    return cardDeck.splice(Math.floor((Math.random() * cardsLeft)), 1);
}


function page1(){
    document.getElementById("pick_cards").classList.toggle("hidden");
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    checkPickSuit();
}

function page2(){
    document.getElementById("pick_cards").classList.toggle("hidden");
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    checkPickRounds();
}

function page3(){
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    document.getElementById("board").classList.toggle("hidden");
    //add visibility to board
    createDeck(countPickSuit()*12);
    console.log(cardDeck);
    //testDeck();
}

//debugging
function testDeck(){
    var card = 0;
    while (cardDeck.length > 0){
        card = drawCard();
        document.getElementById("wrapper").innerHTML += "<img src='"+showCard("images/cards","card",card,"",".jpg")+"' alt='card"+card+"'>";
    }
    console.log("tested deck");
}