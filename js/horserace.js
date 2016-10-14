//Horserace Js file

var deck = new Array(48);
var cardsLeft = 48;

function deckInit(deck){
	for (var i = 0; i<48; i++){
		deck[i]=i+".jpg";
	}
}

//when a card is chosen this card should be removed from the deck
function removeCard(deck, card){
	deck[card]=null;
}

//chooses a "random" card, hack this you mofo, avoid to get drunk.
function randomCard(deck){
	var card = Math.floor((Math.random() * cardsLeft));
	if (deck[card] == null) {
		randomCard(deck);
	}
	deck = removeCard(deck, card);
	cardsLeft--;
	return card;
}


//load this when DOM is loaded, does awesome things
function loaded(){
	//loadDeck(deck);
	deckInit(deck);
	console.log("dope! made the DOM-challenge!");
	for (var i = 0; i < deck.length; i++){
		console.log(deck[i]);
	}
}

//actually fires when DOM is loaded
window.onload = loaded();



function loadDeck(deck){
	for (var i = 0; i<deck.length; i++){
		deck[i]=i+".jpg";
	}
	return deck;
}
