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
    initiateTableButtons("pick_round_amount", "td", 0,13, "rounds", pickRounds);
    //buttons
    document.getElementById("pick_cards_next").addEventListener("click", page2, false);
    document.getElementById("pick_round_amount_back").addEventListener("click", page1, false);
    document.getElementById("pick_round_amount_next").addEventListener("click", page3, false);
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    splash(1, "Väkommen till Horserace!", "splash");
});

var rounds = -1;
var suits = [0, 0, 0, 0]; 

function initiateTableButtons(element, name, startSize, size, id, func){
    console.log("loaded");
    var table = document.getElementById(element); 
    var cells = table.getElementsByTagName(name); 
    for (var i = startSize; i < size; i++) {
        cells[i].id = id+i;
        cells[i].addEventListener("click", func, false);
    }
}

function createDeck(){

}

function hideThis(func){    this.classList.toggle("hidden");    func()  }

function pickRounds(){
    rounds=parseInt(this.id.match(/\d+/), 10)+1;
    console.log(rounds);
}

//var suits =[h='0', d='0', c='0', s='0']; 
function pickSuite(){
    position = this.id.match(/\d/)[0];
    if (suits[position]==1){
        suits[position]=0;
    } else{
        suits[position]=1;
    }
    console.log("added!",this.id, suits[position], suits);
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
}

function page2(){
    document.getElementById("pick_cards").classList.toggle("hidden");
    document.getElementById("pick_round_amount").classList.toggle("hidden");
}

function page3(){
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    //add visibility to board
}
