// Globals
let cribHand;
let gameHand;
let roundCount = 0;
let cardsInCrib = 0;
let lowerHand;
let upperHand;
let deck;
let poneHand;
let dealerHand;
let currentCard;
//Deal Phase


            


$( document ).ready(function() {
    console.log( "ready!" );
    startGame();
});
// Begin Play phase
// 

function startGame() {
    cribHand = [];
    
    //create deck
    cards.init({table:"#game-table"});
    deck = new cards.Deck();
    deck.addCards(cards.all)
    deck.render({immediate:true});
    ///
    document.getElementById("gb-button").addEventListener("click", onStartClick);
}
function onStartClick() {
    document.getElementById("gb-button").removeEventListener("click", onStartClick);
    //create hands
    upperHand = new cards.Hand({faceUp: false, y:50});
    lowerHand = new cards.Hand({faceUp: true, y:600});
    deck.deal(6, [upperHand, lowerHand], 50);
    poneHand = lowerHand;
    dealerHand = upperHand;
    document.getElementById("message-board").textContent = "Pone, please select two cards, one at a time, to send to the Dealer's Crib and Press the 'Send to Crib?' Button";

    //create crib
    createCrib();
    //deal to hands
    preGame(poneHand, function() {
        preGame(dealerHand) 
    });
}

//Pre Game Phase

function preGame(currentHand, cb) {
    //STRETCH--offer cut to select Dealer, reshuffle deck, assign Dealer

    //add listener for current hand
    currentHand.click(onCardClick);
    function onCardClick(card) {
        currentCard = card;
        //console.log(currentCard);
        //console.log(cardsInCrib);
        if (cardsInCrib < 4) {
            document.getElementById("crib-button").style.visibility = "visible";
        }
     }
    document.getElementById("crib-button").addEventListener("click", onCribButtonClick)
    
    function onCribButtonClick() {
        // currentHand.faceUp = false;
        document.getElementById("crib-button").style.visibility = "hidden";
        addCribCards(currentCard); 

        if (cardsInCrib === 2) {
            changeHandVisibility(); 
            //$(currentHand).off("click", onCardClick);

            document.getElementById("crib-button").removeEventListener("click", onCribButtonClick)
            //currentHand.unbind("click");
            console.log("Your Turn is Over; switch to dealer");
            document.getElementById("message-board").textContent = "Dealer, please select two cards, one at a time, to send to Your Crib and Press the 'Send to Crib?' Button";
            cb();
        } else if(cardsInCrib === 4) {
            //console.log("hi");
            document.getElementById("crib-button").removeEventListener("click", onCribButtonClick)
            document.getElementById("gb-button").removeEventListener("click", onStartClick);
            document.getElementById("gb-button").textContent = "Let's Play!"
            changeHandVisibility();
            playPhase();
            
        }
    }
}

function createCrib() {
    cribHand = new cards.Hand({faceUp: false});
    cribHand.x -= 360;
    cribHand.render({callback:function() {
        cribHand.render();
    }});
}
function addCribCards(card, cb) {
    cribHand.addCard(card);
    cribHand.render();
    cardsInCrib++
    document.getElementById("crib-button").removeEventListener("click", addCribCards);
        
}


function changeHandVisibility() {
    poneHand.faceUp = !poneHand.faceUp;
    dealerHand.faceUp = !dealerHand.faceUp;
    poneHand.render();
    dealerHand.render();

}
function switchRoles() {
    poneHand = !poneHand;
    dealerHand = !dealerHand;
    // if (poneHand === lowerHand) {
    //     dealerHand = lowerHand;
    //     poneHand = upperHand;
    // } else
    //     dealerHand = upperHand;
    //     poneHand = lowerHand;
}

// Play Phase
function createGameBoard() {
    gameBoard = new cards.Hand({faceUp: true});
    gameBoard.x += 10;
    gameBoard.render({callback:function() {
        //gameBoard.addCard(deck.topCard());
        gameBoard.render();
    }});
}
function playPhase() {
    createGameBoard();
    showTopCard();
    addGameCards();
}
function addGameCards (card) {
    document.getElementById("message-board").textContent = "Pone, please play a card";
    poneHand.click(poneHandClick);
    dealerHand.click(dealerHandClick);
}
function showTopCard () {
    //shift deck over to give Play space
    deck.x -= 140;
    deck.render();
    deck.addCard(deck.topCard());
    deck.render();
    // create topCard "deck" to place on top of Deck
    topCard = new cards.Deck({faceUp:true});
    topCard.x -= 140;
    deck.render({callback:function() {
    topCard.addCard(deck.topCard());
    topCard.render();
}});
}

function poneHandClick (card) {
    gameBoard.addCard(card);
    card.y += 25;
    gameBoard.render();
    console.log(roundCount);
    console.log(card);
    updateRoundCount(card);
    playPointsCheck(roundCount);
    //getElementById("round-count").textContent = roundCount.value;
    //console.log("round Count = " + roundCount);
    changeHandVisibility();
    document.getElementById("message-board").textContent = "Dealer, please play a card";

}
function dealerHandClick(card){
    gameBoard.addCard(card);
    card.y -= 25;
    gameBoard.render();
    updateRoundCount(card);
    //console.log("round Count = " + roundCount);
    changeHandVisibility();
    document.getElementById("message-board").textContent = "Pone, please play a card";

}
function updateRoundCount (card) {
    let value = Math.min((card.rank % 14), 10)
    console.log("Card rank: " + card.rank +" new value = " + value);
    roundCount += value;
    console.log("round Count = " + roundCount);
    return roundCount;
}
function playPointsCheck(roundCount){
    if (roundCount === 15) {
        //assign +2 to currentPlayer's Game points, post "Fifteen for Two"
    }
    if (roundCount === 31) {
        //assign +2 to currentPlayer's Game Points, post "Thirty-One for Two"
    }
    if (roundCount > 21 && roundCount < 31) {
        checkForGo();
    }
    if (card[i].rank === card[i-1].rank && round has not been reset) {
        //assign +2 to currentPlayer's Game Points, post "Pair for Two"
    }
    if (card[i.rank] === card[i-1].rank && card[i].rank === card[i-2].rank && round has not been reset){
        //assign +6 to currentPlayer's Game Points, post "Pair Royal for Six"
    }
    if (card[i.rank] === card[i-1].rank && card[i].rank === card[i-2].rank && card[i].rank === card[i-3].rank &&round has not been reset){
        //assign +12 to currentPlayer's Game Points, post "Double Pair Royal for Twelve"
    }
}
function checkForGo () {
    currentPlayerHand.forEach((card) => {
        if (roundCount + value <= 31) {
            return;
        } else 
        //declare a Go for current player, and check for Go for other player, allowing them to play up to 31
        //assign +1 for last card played without reaching 31, or +2 for reaching 31
        //reset roundCount, resume play
    }
}