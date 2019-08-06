// Globals
let cribHand;
let cardsInCrib = 0;
let lowerHand;
let upperHand;
let deck;
let poneHand;
let dealerHand;
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
    //create hands
    upperHand = new cards.Hand({faceUp: false, y:50});
    lowerHand = new cards.Hand({faceUp: true, y:600});
    deck.deal(6, [upperHand, lowerHand], 50);
    poneHand = lowerHand;
    dealerHand = upperHand;
    //create crib
    createCrib();
    //deal to hands
    console.log(lowerHand);
    preGame(lowerHand, function() {
        preGame(upperHand) 
    });
}

//Pre Game Phase

function preGame(currentHand, cb) {
    //STRETCH--offer cut to select Dealer, reshuffle deck, assign Dealer

    //add listener for current hand
    let currentCard;
    currentHand.click(onCardClick);
    function onCardClick(card) {
        currentCard = card;
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
            cb();
        } else if(cardsInCrib === 4) {
            document.getElementById("crib-button").removeEventListener("click", onCribButtonClick)
            document.getElementById("gb-button").removeEventListener("click", onStartClick);
            document.getElementById("gb-button").textContent = "Let's Begin!"
            playPhase();
            
        }
    }
}

function createCrib() {
    cribHand = new cards.Hand({faceUp: false});
    cribHand.x -= 260;
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
    if (poneHand === lowerHand) {
        dealerHand = lowerHand;
        poneHand = upperHand;
    } else
        dealerHand = upperHand;
        poneHand = lowerHand;
}

// Play Phase
function createGameBoard() {
    gameBoard = new cards.Hand({faceUp: true});
    gameBoard.x += 50;
    gameBoard.render({callback:function() {
        gameBoard.render();
    }});
}
function playPhase() {
    createGameBoard();
    //shift deck over to give Play space
        deck.x -= 140;
        deck.render();
}