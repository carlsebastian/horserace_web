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
    initiate();
});

function initiate(){
    console.log("loaded");
    var table = document.getElementById("pick_cards"); 
    var cells = table.getElementsByTagName("div"); 
    for (var i = 0; i < 4; i++) {
        cells[i].id = "picksuite"+i;
        cells[i].addEventListener("click", pickSuite, false);
    }
    for (var i = 4; i < 6; i++) {
        cells[i].id = "event"+i;
        cells[i].addEventListener("click", action, false);
    }
}

var suits=['h','d','c','s'];
var 
function pickSuite(){
    suits.push('1');
    console.log("added!",this.id);
}

function action(){
    console.log("action!");
}