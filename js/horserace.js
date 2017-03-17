function pageLoad(func) {
    var oldOnLoad = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldOnLoad();
            func;
        }
    }
}

var reset = {
  suits: [1,1,1,1],
  rounds: 7,
  position: [0,0,0,0],
  cardDeck: 0,
  lastPosition: 0,
  steppingCards: []
}

var globals = reset;
console.log(reset, globals);

pageLoad(function(){
  document.getElementById("draw").addEventListener("click", function(){ drawCard(); }, false);
  // document.getElementById("restart").addEventListener("click", function(){ promptRestart(); },false);
  initiateGame();
});

function initiateGame(){
  createCardDeck();
  generateSteppingCards();
}

function promptRestart(){
  if (confirm("Are you sure?")){
    window.location.reload();
  }
}

function createCardDeck(){
  globals.cardDeck = new Array(48);
  for (var i = 0; i < 48; i++){
    globals.cardDeck[i]=i;
  }
}

function drawCard(){
  var card = drawCardFromDeck();
  console.log(card);
  document.getElementById("pile").innerHTML += showCard(card);
  //"<img src='"+showCard("images/cards","card",card,"",".jpg")+"' alt='card"+card+"' class='pile'>";
  updateStatus(arrToColourSwedish(checkColour(card))+" går ett steg framåt!");
  move(card);
  checkWon();
  checkLast();
}

function drawCardFromDeck(){
  return globals.cardDeck.splice(Math.floor(Math.random() * (globals.cardDeck.length - 0)), 1);
}

function generateSteppingCards(){
  for (var i = 0; i<7; i++){
    globals.steppingCards.push(drawCardFromDeck);
  }
}

function updateStatus(text, add){
  changeHTML("status", text, add);
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

function checkLast(){
    if ( findMin( globals.position ) > globals.lastPosition ){
      document.getElementById("draw").setAttribute("disabled", "true");
      setTimeout(function () {
        globals.lastPosition++;
        // draw new
        var card = drawCardFromDeck()[0];
        updateStatus((" <b> =>  <u>"+arrToColourSwedish(checkColour(card))+" går ett steg bakåt!</b></u>"), true);
        console.log(card);
        document.getElementById("steppingCard_0"+globals.lastPosition).src=getCardSrc("images/cards","card",card,"",".jpg");
        var colour = checkColour(card);
        globals.position[colour]--;
        var html = document.getElementById(arrToColour(checkColour(card)));
        var elements = html.getElementsByClassName("card");
        var a = true;
        while ( a ){
            elements[0].parentNode.removeChild(elements[0]);
            a = false;
        }
        document.getElementById("draw").removeAttribute("disabled");
      }, 1500);
    }
}



function checkWon(){
    if (findMax(globals.position) >= 7){
      var button ="<button id='restart'>Restart</button>";
      splash(4000, (arrToColourSwedish(searchi(globals.position, findMax(globals.position)))+" är vinnaren! "+button));
      // ));
    }
}

function move(card){
    if (globals.cardDeck.length > 0){
        var colour = checkColour(card);
        globals.position[colour] ++;
        var position = globals.position[colour];
        var html = document.getElementById(arrToColour(checkColour(card))).innerHTML;
        document.getElementById(arrToColour(checkColour(card))).innerHTML = "<div class='card card_dimension'> </div>"+html;
    }
}

 //splashscreen for displaying temporary messages
function splash(time, message){
    var el = document.getElementById("splash");
    document.getElementById("splash_message").innerHTML = message;
    el.classList.toggle("hidden");

    document.getElementById("restart").addEventListener("click", function(){ promptRestart(); },false);
    // window.setTimeout(function(){el.classList.toggle("hidden")}, time);
}

function showCard(number){
  return ("<img src='"+getCardSrc("images/cards","card",number,"",".jpg") +"' alt='playing card' class='knight pile card_dimension'>");
}

function getCardSrc(folder, prefix, number, infix, suffix){
    return folder+"/"+prefix+number+infix+suffix;
}



function findMin(arr){
    var min = arr[0];
    for (var i = 0; i<arr.length; i++){
        if (arr[i] < min){
            min = arr[i];
        }
    }
    return min;
}

function findMax(arr){
    var max = arr[0];
    for (var i = 0; i<arr.length; i++){
        if (arr[i] > max){
            max = arr[i];
        }
    }
    return max;
}

function arrToColourSwedish(position){
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

function searchi(arr, val){
    for (var i = 0; i < arr.length; i++){
        if (arr[i] == val){
            return i;
        }
    }
}

function toggleClass(el, classy){
    el.classList.toggle(classy);
}
