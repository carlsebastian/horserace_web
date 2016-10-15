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
    initiateTableButtons("pick_cards", "div", 0,4, "picksuite", pickSuite);
    initiateTableButtons("pick_round_amount", "td", 0,12, "rounds", pickRounds);
    //buttons
    
    document.getElementById("pick_round_amount_back").addEventListener("click", page1, false);
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    splash(1, "Väkommen till Horserace!", "splash");
});

var rounds = -1;
var suits = [0, 0, 0, 0];


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

// function createDeck(){

// }

function toggleClass(el, classy){
    el.classList.toggle(classy);
    console.log(el, classy);
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

function activateButton(){

}

//var suits =[h='0', d='0', c='0', s='0']; 
function pickSuite(){
    toggleClass(this, "active");
    position = this.id.match(/\d/)[0];
    if (suits[position]==1){
        suits[position]=0;
    } else{
        suits[position]=1;
    }
    console.log("added!",this.id, suits[position], suits);
    checkPickSuite();
}

function checkPickSuite(){
    var len=0;
    for (var i = 0; i<suits.length; i++){
        if (suits[i]>0){
            len++;
        }
    }
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

function page1(){
    document.getElementById("pick_cards").classList.toggle("hidden");
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    checkPickSuite();
}

function page2(){
    document.getElementById("pick_cards").classList.toggle("hidden");
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    checkPickRounds();
    // changeHTML("status","Välj antal kort", false);
}

function page3(){
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    //add visibility to board
}
