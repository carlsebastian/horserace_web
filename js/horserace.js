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
    initiateTableButtons("pick_cards", "div", 4, "picksuite");
    initiateButton();
    document.getElementById("pick_cards_next").addEventListener("click", hideEl, false);
});

function initiateTableButtons(element, name, size, id){
    console.log("loaded");
    var table = document.getElementById(element); 
    var cells = table.getElementsByTagName(name); 
    for (var i = 0; i < size; i++) {
        cells[i].id = id+i;
        cells[i].addEventListener("click", pickSuite, false);
    }
}

//below is hardcoded, maybe change html?
function initiateButton(){
    pick_cards.addEventListener("click", hideThis, false); //(showThis("pick_round_amount"))
}

function hideThis(func){
    this.classList.toggle("hidden");
}
function hideEl(el, show){
    this.classList.toggle("hidden");
}

function showThis(el){
    el.classList.toggle("hidden");
}

//var suits=[h='0', d='0', c='0', s='0']; 
var suits = [0, 0, 0, 0]; 
function pickSuite(){
    position = this.id.match(/\d/);
    if (suits[position]==1){
        suits[position]=0;
    } else{
        suits[position]=1;
    }
    console.log("added!",this.id, suits[position], suits);
}

function action(){
    console.log("action!");
}