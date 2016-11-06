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

pageLoad(function(){
    //should not be there..
    var content = document.getElementById("wrapper").innerHTML;
    document.getElementById("wrapper").innerHTML = "<a href='index.html'><button id='restart'>Omstart</button></a>"+content;
    document.getElementById("restart").addEventListener("click", function(){document.location.reload(true)}, false);

    //
    initiateTableButtons("pick_cards", "div", 0,4, "pickSuit", pickSuit);
    initiateTableButtons("pick_round_amount", "td", 0,12, "rounds", pickRounds);
    document.getElementById("draw_card").addEventListener("click", function(){ card(); }, false);


    document.getElementById("pick_round_amount_back").addEventListener("click", page1, false);
    document.getElementById("pick_round_amount").classList.toggle("hidden");
    document.getElementById("board").classList.toggle("hidden");
    //splash(2000, "Väkommen till Horserace!", "splash");

    //debugfunction
    //debug();
});

function debug(){
    document.getElementById("status").innerHTML = "DEBUG MODE, remove debug from pageLoad to fix";

    page2();
    page3();

    _suits=[1,1,1,1];
    _rounds=7;
    console.log(_suits);
    console.log(_cardDeck);
    createDeck(countPickSuit()*12);
    //createDeck(47);
    //testDeck();
    // for (var i = 0; i < 10; i++){
    //     console.log(checkColour( -1));
    // }
    document.getElementById("status").innerHTML = "DEBUG MODE, remove debug from pageLoad to fix";

    // for (var i = 0; i < 48; i++){
    //     card();
    // }
}

function checkColour(card){
    var position = 0;
    switch (true){
        case (card > 35 ):
            position = 3;
            break; 
        case (card > 23 ):
            position = 2;
            break;
        case (card > 11 ):
            position = 1;
            break;
        case (card >= 0 ):
            position = 0;
            break;
        default: 
            position = -1;
            break; 
    }
    return position;
}

function checkLast(){
    console.log("checkLast", findMinActive(_position));
    if ( findMinActive( _position ) > _lastPosition ){
        _lastPosition++;
        var card = drawCard();
        var colour = checkColour(card);
        _position[colour]--;
        changeHTML(("stats"+colour), _position[colour]);
        changeHTML("controlcard",("Kontrollkort: ", _lastPosition));
        console.log("checkLastMovedBack", colour, card, "_lastPosition", _lastPosition,"_position[colour]",_position[colour]);
        // splash(3000, ("Tillbaka med dig!"+ card), "splash");
        document.getElementById("moveback").innerHTML += "<img src='"+showCard("images/cards","card",card,"",".jpg")+"' alt='card"+card+"'>";
    }
}

function searchi(arr, val){
    for (var i = 0; i < arr.length; i++){
        if (arr[i] == val){
            return i;
        }
    }
}

function findMinActive(arr){
    if (arr.length > 0){
        var min = arr[searchi(_suits, 1)];
        console.log("min", min);
        for (var i = 0; i < arr.length; i++){
            if (_suits[i] != 0){
                if (arr[i] < min){
                    min = arr[i];    
                }
            }
        }
        return min;
    }
}

function checkWon(){
    if (findMax(_position) >= _rounds){
        splash(10000, (arrToColour( findMaxPosition(_position) )+" är vinnaren!"), "splash");
        //resetGlobals();
    }
}

function arrToColour(position){
    switch (position){
        case 0: return "hjärter"; break;
        case 1: return "spader"; break;
        case 2: return "klöver"; break;
        case 3: return "ruter"; break;
        default: return "odefinierat"; break;
    }
}

function move(card){
    if (_cardDeck.length > 0){
        var colour= checkColour(card);
        _position[colour] ++;
        var position = _position[colour];
        // for (var i = 0; i < 4; i++){
        //     if ( i != colour){
        //         changeHTML(("stats"+i), "0", true);
        //     }
        // }
        changeHTML(("stats"+colour), position);
        console.log("stats"+colour);
    }
}

function card(){
    console.log("card", _cardDeck.length);
    var card = 0;
    if ( _cardDeck.length > 0 ){
        card = drawCard();
        document.getElementById("board_cards").innerHTML += "<img src='"+showCard("images/cards","card",card,"",".jpg")+"' alt='card"+card+"'>";
        move(card);
        checkWon();
        checkLast();
    }
    console.log("card", _cardDeck.length);
    document.getElementById("draw_card").addEventListener("click", card, false);    
}

function resetGlobals(){
    _rounds = -1;
    _suits = [0, 0, 0, 0];
    _position = [0, 0, 0, 0];
    _cardDeck = null;
    _cardDeckLeft = -1;
    _lastPosition = 0;
}

var _rounds = -1;
var _suits = [0, 0, 0, 0];
var _position = [0, 0, 0, 0];
var _cardDeck = null;
var _cardDeckLeft = -1;
var _lastPosition = 0;
var _activesuits = null;

function activeSuits(arr){
    var min = findMin(arr);
    _activesuits.push(findMin(arr));
    for (var i = min; i < arr.length; i++ ){
        if ( arr[i] != 0){
            _activesuits.push(i);
        }
    }
}

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
    _rounds=parseInt(this.id.match(/\d+/), 10)+1;
    console.log(_rounds);
    checkPickRounds();
}

function checkPickRounds(){
    if (_rounds > 0){
        changeHTML("status",("Du har valt "+_rounds+" kort. Tryck vidare för att börja spela"),false);
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
    if (_suits[position]==1){
        _suits[position]=0;
    } else{
        _suits[position]=1;
    }
    console.log("added!",this.id, _suits[position], _suits);
    checkPickSuit();
}

function countPickSuit(){
    var len = 0;
    for (var i = 0; i<_suits.length; i++){
        if (_suits[i]>0){
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
    _cardDeck = new Array( size );
    console.log(_cardDeck);
    _cardDeckLeft = size;
    var control=0;
    var add = 0;

    for (var i=0; i < _cardDeck.length; i ++ ){
        if (i%12 == 0){
            if (_suits[control] == 0){
                while (_suits[control] == 0){
                    control ++;
                    add += 12;
                }
            }
            control++;
        }
        _cardDeck[i] = i+add;
    }
    console.log(_cardDeck);
}

function drawCard(){
    var cardsLeft = _cardDeck.length;
    if ( cardsLeft == 0){
        return null;
    }
    _cardDeckLeft--;
    changeHTML("status",(_cardDeckLeft+" kort kvar"),false);
    console.log("drawCard", _cardDeck.length);
    return _cardDeck.splice(Math.floor((Math.random() * cardsLeft)), 1);
}

// function generateBoard(array, rounds){
//     var width =     document.getElementById("board_cards").offsetWidth;
//     var height =    document.getElementById("board_cards").offsetHeight;   
// }

function generateBoard(suits, rounds){ //array with active colours as input
    var rows = countPickSuit(suits);
    var newTable = "";
    console.log(activeSuits(suits));
    for (var i = 0; i < rows+1; i++){
        newTable += "<tr id='col"+ i +"'>";
        var suit = getSuit();
        if (i==0){
            for (var j=0; j < rounds; j++){
                newTable += ("<td>"+j+"</td>");
            }
        }
        else {
            for (var j = 0; j < rounds; j++){
                newTable += ("<td id='cell>"+(i*suit)+"<'/td>");
            }
        }
        newTable += "</tr>";
    }
    document.getElementById("board_tbl").innerHTML = newTable;
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
    //console.log(_cardDeck);
    generateBoard(_suits, _rounds);
    //testDeck();
}

function findMin(arr){
    if (arr.length > 0){
        var min = arr[0];
        for (var i = 0; i<arr.length; i++){
            if (arr[i] < min){
                min = arr[i];
            }
        }
        return min;
    }
    else {
        return null;
    }
}

function findMax(arr){
    if (arr.length > 0){
        var max = arr[0];
        for (var i = 0; i<arr.length; i++){
            if (arr[i] > max){
                max = arr[i];
            }
        }
        return max;
    }
    else {
        return null;
    }
}

function findMaxPosition(arr){
    if (arr.length > 0){
        var pos = 0;
        var val = arr[0];
        for (var i=0; i<arr.length; i++){
            if (arr[i] > val){
                val = arr[i];
                pos = i;
            }
        }
        return pos;
    }
    else {
        return null;
    }
}

//debugging
function testDeck(){
    var card = 0;
    while (_cardDeck.length > 0){
        card = drawCard();
        document.getElementById("wrapper").innerHTML += "<img src='"+showCard("images/cards","card",card,"",".jpg")+"' alt='card"+card+"'>";
    }
    console.log("tested deck");
}