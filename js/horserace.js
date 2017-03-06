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

var vars;

_suits=[1,1,1,1];
_rounds=7;

pageLoad(function(){
    document.getElementById("draw_card").addEventListener("click", function(){ card(); }, false);
    document.getElementById("board").classList.toggle("hidden");
    page3();
});

function page3(){
    document.getElementById("board").classList.toggle("hidden");
    createDeck(countPickSuit()*12);
    //here´s where to problems arise
    generateBoard(_suits, _rounds);
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

//related to page3
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

function generateBoard(suits, rounds){ //array with active colours as input
    console.log("generateBoard");
    var board = document.getElementById("board_cards").innerHTML;
    board += "<div id='stepping_cards' class='row'>";
    for (var i = 0; i < rounds; i++){
        board += "<img src='"+showCard("images/cards","card",53,"",".jpg") +"' alt='' class='card' id='step"+(i+1)+"''>";
    }
    board += "<div class='card'><img src='"+showCard("images/cards","card",55,"",".jpg")+"' alt='goacard'></div></div>";
    for (var i = 0; i < suits.length; i++){
        console.log("suits", i);
        if (suits[i] == 1){
            board += "<div class='row' id='"
            +arrToColour(i)+ "'><img src='"+showCard("images/cards","card",(arrToColour(i)),"",".jpg") +"' alt='' class='card knight'> </div>";
        }
    }
    document.getElementById("board_cards").innerHTML = board;
}


//common functions
function changeHTML(divid, text, add){
    if (add) {
        document.getElementById(divid).innerHTML += text;
    }
    else {
        document.getElementById(divid).innerHTML = text;
    }
}

function toggleClass(el, classy){
    el.classList.toggle(classy);
}


//card-deck functions
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

function arrToColourHuman(position){
    switch (position){
        case 0: return "hjärter"; break;
        case 1: return "spader"; break;
        case 2: return "klöver"; break;
        case 3: return "ruter"; break;
        default: return "odefinierat"; break;
    }
}

function arrToColour(position){
    switch (position){
        case 0: return "hearts"; break;
        case 1: return "spades"; break;
        case 2: return "clubs"; break;
        case 3: return "diamonds"; break;
        default: return "undefined"; break;
    }
}


function checkLast(){
    console.log("checkLast", findMinActive(_position), _lastPosition);
    if ( findMinActive( _position ) > _lastPosition ){
        console.log("back");
        _lastPosition++;
        var card = drawCard();
        var colour = checkColour(card);
        _position[colour]--;
        changeHTML(("stats"+colour), _position[colour]);
        changeHTML("controlcard",("Kontrollkort: ", _lastPosition));
        //console.log("checkLastMovedBack", colour, card, "_lastPosition", _lastPosition,"_position[colour]",_position[colour]);
        // splash(3000, ("Tillbaka med dig!"+ card), "splash");
        var last = ("step"+_lastPosition);
        console.log("last", last);
        var src = showCard("images/cards","card",card,"",".jpg");
        console.log("src", src);
        document.getElementById(last).src = src;

        var html = document.getElementById(arrToColour(checkColour(card)));
        console.log(html);

        var elements = html.getElementsByClassName("card");
        var a = true;
        while ( a ){
            elements[0].parentNode.removeChild(elements[0]);
            a = false;
        }
        console.log("html", html,"elements", elements);
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
        //console.log("min", min);
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
      var button =""; //"<button action='js:pageLoad();'>Click</button>";
        splash(10000, (arrToColour( findMaxPosition(_position) )+" är vinnaren! "+button), "splash");
        //resetGlobals();
    }
}

function move(card){
    if (_cardDeck.length > 0){
        var colour= checkColour(card);
        _position[colour] ++;
        var position = _position[colour];
        var html = document.getElementById(arrToColour(checkColour(card))).innerHTML;
        document.getElementById(arrToColour(checkColour(card))).innerHTML = "<div class='card'></div>"+html;
        changeHTML(("stats"+colour), position);
        console.log("stats"+colour);
    }
}

function card(){
    console.log("card", _cardDeck.length);
    var card = 0;
    if ( _cardDeck.length > 0 ){
        card = drawCard();
        console.log(card);
        document.getElementById("pile").innerHTML += "<img src='"+showCard("images/cards","card",card,"",".jpg")+"' alt='card"+card+"' class='pile'>";
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

// var _rounds = -1;
// var _suits = [0, 0, 0, 0];
var _position = [0, 0, 0, 0];
var _cardDeck = null;
var _cardDeckLeft = -1;
var _lastPosition = 0;
var _activesuits = null;

function activeSuits(arr){
    var min = findMin(arr);
    //_activesuits.push(findMin(arr));
    for (var i = min; i < arr.length; i++ ){
        if ( arr[i] != 0){
            //_activesuits.push(i);
        }
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
