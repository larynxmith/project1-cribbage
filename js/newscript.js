// Globals
let cribHand;
let cardsInCrib = 0;
let lowerHand;
let upperHand;
let deck;
//Deal Phase




// });

console.log("Crib Hand: " + cribHand);
console.log("Lower Hand: " + lowerHand);
console.log("Upper Hand: " + cribHand);
            

//var isCardSelected = false;

    // cribHand.addCard(card);
    //     console.log("Crib Hand: " + cribHand);
    //     cribHand.render();

    // isCardSelected = !isCardSelected;
    // if (isCardSelected) {
    //     document.getElementById("p1-button").style.visibility = "visible";
    // }
    // document.getElementById("p1-button").addEventListener("click", function(card) {
    //     console.log(card);
    //     cribHand.addCard(card);
    //     console.log("Crib Hand: " + cribHand);
    //     //cribHand.render();
    // })
    
    // console.log(isCardSelected);
    // console.log(lowerHand);
    //  card.moveTo(card.targetLeft + 34.5, card.targetTop + 47 - 25  , 500);
    //     lowerHand.render();




//functions

// function createCrib () {
//     cribHand = new cards.Hand({faceUp: false});
//     cribHand.x -= 300;
//     cribHand.render({callback:function() {
// 	cribHand.addCard(deck.topCard());
//     cribHand.render();
//     console.log("Crib Hand: " + cribHand);

// }});
// }

// function dealHands () {
//     upperHand = new cards.Hand({faceUp: false, y:50});
//     lowerHand = new cards.Hand({faceUp: true, y:600});

    // deck.deal(6, [upperHand, lowerHand], 50);
    // console.log("Lower Hand: " + lowerHand);
    // console.log("Upper Hand: " + upperHand);
// }
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
    document.getElementById("gb-button").addEventListener("click", function() {
        //create hands
        upperHand = new cards.Hand({faceUp: false, y:50});
        lowerHand = new cards.Hand({faceUp: true, y:600});
        deck.deal(6, [upperHand, lowerHand], 50);
        //create crib
        createCrib();
        //deal to  hands
        preGame(lowerHand, function() { preGame(upperHand) });

    });
}


function preGame(currentHand, cb) {
    //STRETCH--offer cut to select Dealer, reshuffle deck, assign Dealer

    //add listener for current hand
    let currentCard;
    currentHand.click(function(card) {
        console.log(card)
        currentCard = card;
        document.getElementById("crib-button").style.visibility = "visible";
    });

    document.getElementById("crib-button").addEventListener("click", () => {
        // currentHand.faceUp = false;
        document.getElementById("crib-button").style.visibility = "hidden";
        addCribCards(currentCard) 

        if (cardsInCrib === 2) {
            console.log("hello cards in crib");
            
            if(cb == undefined) { 
                return; 
            } else {
                console.log("Your Turn is Over; switch to dealer");
                console.log(cb);
                cb()
            };
        }
    });

    
    
}

function createCrib() {
    cribHand = new cards.Hand({faceUp: false});
    cribHand.x -= 260;
    cribHand.render({callback:function() {
        cribHand.render();
        console.log("Crib Hand: " + cribHand);
    }});
}
function addCribCards(card, cb) {
    cribHand.addCard(card);
    console.log("Crib Hand: " + cribHand);
    cribHand.render();
    cardsInCrib++
    document.getElementById("crib-button").removeEventListener("click", addCribCards);
    console.log("Cards in Crib: " + cardsInCrib);
        
}
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
    deck.click(function(card) {
        deck.x -= 140;
        deck.render();
    })
}

//         if (cardsInCrib = 2) {
//             // lowerHand.off("click");
//             if(cb == undefined) {
//                 return; 
//             } else {
//                 cb()
//             };
//         }