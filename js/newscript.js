// Globals
let cribHand;
let gameHand;
let roundCount = 0;
let cardsInCrib = 0;
let playerOneGamePoints = 0;
let playerOneMatchPoints = 0;
let playerTwoGamePoints = 0;
let playerTwoMatchPoints= 0;
let ponePoints = 0;
let dealerPoints = 0;
let gameBoardCards = 0;
let lowerHand;
let upperHand;
let deck;
let poneHand;
let dealerHand;
let currentCard;
let isPoneTurn;
let currentPhase;
//Deal Phase


            


$( document ).ready(function() {
    console.log( "ready!" );
    startGame();
});
// Begin Play phase
// 

function startGame() {
    //pre-game = currentphase 0
    currentPhase = 0;
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
    document.getElementById("gb-button").style.visibility = "hidden";
    //create hands
    upperHand = new cards.Hand({faceUp: false, y:50});
    lowerHand = new cards.Hand({faceUp: true, y:600});
    deck.deal(6, [upperHand, lowerHand], 50);
    poneHand = lowerHand;
    dealerHand = upperHand;
    document.getElementById("dealer-top").style.visibility = "visible";
    document.getElementById("message-board").textContent = "Pone, please select two cards, one at a time, to send to the Dealer's Crib and Press the 'Send to Crib?' Button";
    isPoneTurn = true;
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
    currentHand.click(handleHandClick);
    function onCardClick(card) {
        console.log(currentHand.faceUp);
        if(currentHand.faceUp) {
            currentCard = card;
        } else {
            console.log("Not your turn!");
        };
    
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
    poneHand = !poneHand;
    dealerHand = !dealerHand;
    dealerPoints = playerOneGamePoints;
    ponePoints = playerTwoGamePoints;
    // if (poneHand === lowerHand) {
    //     dealerHand = lowerHand;
    //     poneHand = upperHand;
    // } else
    //     dealerHand = upperHand;
    //     poneHand = lowerHand;
}

// Play Phase
function playPhase() {
    currentPhase = 1;
    createGameBoard();
    showTopCard();
    addGameCards();
    //playCardsOnBoard();
    if (roundCount > 21 && roundCount < 31) {
        console.log("Checking for Go");
        currentPlayerPoints = checkForGo(currentPlayerPoints);
    };
    
}
function createGameBoard() {
    gameBoard = new cards.Hand({faceUp: true});
    gameBoard.x += 10;
    gameBoard.render({callback:function() {
        //gameBoard.addCard(deck.topCard());
        gameBoard.render();
    }});
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
    if (topCard[0].rank === 11){
        console.log("His Heels for Two")
        dealerPoints += 2;
    };
}});
}
function addGameCards (card) {
    document.getElementById("message-board").textContent = "Pone, please play a card";
}
function handleHandClick (card) {
    if (currentPhase === 0) {
        if(card.container.faceUp) {
            currentCard = card;
        } else {
            console.log("Not your turn!");
        };
    
        //console.log(currentCard);
        //console.log(cardsInCrib);
        if (cardsInCrib < 4) {
            document.getElementById("crib-button").style.visibility = "visible";
        }
    } else if (currentPhase === 1) {
        if (isPoneTurn && card.container.faceUp) {
            poneHandClick(card);
            isPoneTurn = !isPoneTurn;
        } else if(!isPoneTurn && card.container.faceUp) {
            dealerHandClick(card);
            isPoneTurn = !isPoneTurn;
        }
        if (gameBoard.length === 8) {
            if (isPoneTurn){
                dealerPoints +=1;
            } else{
                ponePoints +=1;
            }
            document.getElementById("message-board").textContent = "Last Card for One";
            endGame();
        }
    }
    console.log("IS it pone's turn?" + isPoneTurn)
}
// function playCardsOnBoard (card) {
//     poneHandClick(card);
//     dealerHandClick(card);
// }

function poneHandClick (card) {
    gameBoard.addCard(card);
    //card.y += 25;
    gameBoard.render();
    updateRoundCount(card);
    ponePoints = playPointsCheck(ponePoints);
    console.log("Player One's points: " + ponePoints);
    //getElementById("round-count").textContent = roundCount.value;
    //console.log( roundCount);
    changeHandVisibility();
    document.getElementById("message-board").textContent = "Dealer, please play a card";

}
function dealerHandClick(card){
    gameBoard.addCard(card);
    //card.y -= 25;
    gameBoard.render();
    updateRoundCount(card);
    dealerPoints = playPointsCheck(dealerPoints);
    console.log("Player Two's points: " + dealerPoints);
    //
    changeHandVisibility();
    document.getElementById("message-board").textContent = "Pone, please play a card";

}
function updateRoundCount (card) {
    let value = Math.min((card.rank % 14), 10)
    console.log("Card rank: " + card.rank +" new value = " + value);
    roundCount += value;
    console.log("round Count = " + roundCount);
    document.getElementById("round-count").textContent = roundCount;
    document.getElementById("pone-points").textContent = ponePoints;
    document.getElementById("dealer-points").textContent = dealerPoints;
    return roundCount;
}


function playPointsCheck (currentPlayerPoints) {
    switch (true) {
        case (gameBoard.length === 2) :
            currentPlayerPoints = checkforFifteen(currentPlayerPoints);
            console.log(currentPlayerPoints);
            currentPlayerPoints = checkForPair(currentPlayerPoints);
            console.log(currentPlayerPoints);
            break;
        case (gameBoard.length === 3) :
            currentPlayerPoints = checkforFifteen(currentPlayerPoints);
            currentPlayerPoints = checkForPair(currentPlayerPoints);
            currentPlayerPoints = checkForRoyal(currentPlayerPoints);
            currentPlayerPoints = checkForRuns(currentPlayerPoints);
            break;
        case (gameBoard.length >= 4) :
            currentPlayerPoints = checkforFifteen(currentPlayerPoints);
            currentPlayerPoints = checkForPair(currentPlayerPoints);
            currentPlayerPoints = checkForRoyal(currentPlayerPoints);
            currentPlayerPoints = checkForRuns(currentPlayerPoints);
            currentPlayerPoints = checkForThirtyOne(currentPlayerPoints);
            break;
        default :
            console.log("Points not working");
            break;
    }
    console.log(currentPlayerPoints);
    return currentPlayerPoints;
}

function checkforFifteen (currentPlayerPoints) {
    if(roundCount === 15) {
        console.log("Fifteen for Two");
        return currentPlayerPoints + 2;
    }
    return currentPlayerPoints;
};
function checkForPair (currentPlayerPoints) {
    let i = gameBoard.length - 1;
    console.log(gameBoard);
    console.log("Current card is : " + gameBoard[i]);
    if (gameBoard[i].rank === gameBoard[i-1].rank) {
        console.log("Pair for Two");
        return currentPlayerPoints + 2;
    }
    return currentPlayerPoints;
}
function checkForRoyal (currentPlayerPoints) {
    let i = gameBoard.length - 1;
    console.log(gameBoard);
    console.log("Current card is : " + gameBoard[i]);
    if (gameBoard[i].rank === gameBoard[i-1].rank && gameBoard[i-1].rank === gameBoard[i-2].rank) {
        console.log("Pair Royal for Six"); 
        return currentPlayerPoints + 4;
    }
    return currentPlayerPoints;
}
function checkForDoubleRoyal (currentPlayerPoints) {
    let i = gameBoard.length - 1;
    console.log(gameBoard);
    console.log("Current card is : " + gameBoard[i]);
    if (gameBoard[i].rank === gameBoard[i-1].rank && gameBoard[i-1].rank === gameBoard[i-2].rank && gameBoard[i-2].rank === gameBoard[i-3].rank) {
        console.log("Double Pair Royal for Twelve");
        return currentPlayerPoints +=6 ;
    }
    return currentPlayerPoints;
}
function checkForRuns(currentPlayerPoints) {
    //run check, TBD
    return currentPlayerPoints;
}
function checkForThirtyOne(currentPlayerPoints) {
    if (roundCount === 31) {
        return currentPlayerPoints + 2
    }
    return currentPlayerPoints;
}
function checkForGo () {
    currentPlayerHand.forEach((card) => {
        if (roundCount + card.rank <= 31) {
            return;
        } else {
        //declare a Go for current player, and check for Go for other player, allowing them to play up to 31
        //assign +1 for last card played without reaching 31, or +2 for reaching 31
        //reset roundCount, resume play
        };
    });
}
function endGame(){
    currentPhase = 2
    playerOneGamePoints = ponePoints;
    playerTwoGamePoints = dealerPoints;
    document.getElementById("p2-game-points").textContent = playerTwoGamePoints;
    document.getElementById("p1-game-points").textContent = playerOneGamePoints;
    //TBD
}

