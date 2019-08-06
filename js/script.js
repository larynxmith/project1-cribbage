// set logic
// build/style page
// update Readme 


// DEAL PHASE
    // cut for Deal 
    // shuffle
    // assign Dealer 
    // cut deck
    // deal cards
    
// CRIB PHASE
    //discard two cards each to crib

// START PHASE
    //flip top card
    //evaluate for Jack, add dealer pts if necessary

// PLAY PHASE
    //play one card in turn
    //add Count call per player
    //Game points during Play Phase
    //Count cannot exceed 31
    //conditions for last card in current Count
    //Count resets
    //Game continues until all cards played
// SHOW PHASE
    //Points calculation for Hand + Start Card per player, Dealer last
    //Crib calculation, added to Dealer

// END PHASE
    //121 Game points is WIN
        //end current Game
        //Match point(s) added: check Skunks and Match win
        //reset board and Game variables
        //deal passes, new Game begins

    //replay until Match is won

//POINTS LOGIC
    //Play Points
        //15 for Two
        //31 for Two
        //GO vs. last card in Count for One/Last Card for One
        //Runs
        //Pairs
    //Show Points
        //Player Flush
        //Special Runs
        //15 for Two
        
console.log(cards);

const CARD_DECK = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
var shuffledDeck = [];
var cutDeck = [];
var handLength = 6;
var dealerHand = [];
var poneHand = [];
var cribHand = [];
var gameBoard = [];
var startCard;
var gameCount = 15;
var playerOneGamePoints = 0;
var playerOneMatchPoints = 0;
var playerTwoGamePoints = 0;
var playerTwoMatchPoints= 0;
var currentPlayerPoint = 0;
var pone;
var dealear;

//Create CARD_DECK through constructor
class Deck {
    constructor () {
        this.deck = [cardRanks, cardSuits, cardValues];

        const cardRanks = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"]
        const cardSuits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

        for (let suit of cardSuits){
            for (let value of cardValues) {
                for (let rank of cardRanks) { 
                    this 
                }
            }
        }
    }
}


console.log("Unshuffled deck: " + CARD_DECK);
// Deal Phase
shuffledDeck = CARD_DECK;
console.log("transferred deck: " + shuffledDeck);
shuffledDeck = shuffleArray(shuffledDeck);
//each player selects card from deck; lower card assigned dealer
//re-shuffle deck
console.log("constant deck: " + CARD_DECK);
console.log("Shuffled Deck " + shuffledDeck);
cutDeck = cutArray(shuffledDeck);
console.log(cutDeck);

dealHands(cutDeck);
//re-sort hands by value, lowest to highest
flipTopCard(cutDeck);

// Play Phase
//Pone selects first card to play, assign the gameBoard[0]
//Dealer selects second card to play, assign to gameBoard[1]
    //begin fifteenCheck for each card until count > 15
    //begin pairsCheck
//Pone selects third card to play, etc...
    //begin runCheck
    //begin to evaluate if next player can play card from hand >= 31
    //if 31, player receive +=2 Game points
    //if no, declare Go for next player
    //evaluate if current player can, else declare Go
    //currentPlayerPoint += 1
//once Count = 31, or both players declare Go, Game count resets to Zero
//play resumes
//repeat evaluations, issue +=1 for last card played, Play phase ends

//Show Phase
//Evaluate poneHand + Start card first
    //check for pairs of any cards
    //check for fifteens of any combination of cards
    //check for runs of any cards
    //check for flush of all cards; 4 if in-hand, 5 if + Start Card
//Evaluate dealerHand + Start card second
    //run same checks as above
//Evaluate cribHand + Start card last
    //run same checks as above
    //--Exception-- flush must be all 5 cards

//End Phase
//121pt = WIN, at any time in point distrubtion
// +=1 Match point for winner
    //check for Skunks
//Play again
    //gameBoard reset 
    //deal passes




if (gameCount === 15) {
    playerOneGamePoints += fifteenCheck(playerOneGamePoints);
    console.log("Fifteen for Two");
} else if (gameCount === 31) {
    playerOneGamePoints += thrityOneCheck(playerOneGamePoints);
    console.log("Thirty-One for Two");
}

// Functions
function cutArray(deck) {
    var topCut = deck.splice(0, 3);
    console.log(topCut);
    cutDeck = deck.concat(topCut);
    return cutDeck;
}

function dealHands(deck) {
    for(i = 0; i< handLength; i++) {
        poneHand[i] = deck.shift(0, 1);
        dealerHand[i] = deck.shift(0, 1);
        console.log("poneHand: " +poneHand);
        console.log("delaerHand: " + dealerHand);
        console.log(cutDeck);
    }
    return deck;
}

function fifteenCheck(currentPlayerPoint) {
    if (gameCount === 15) {
        return currentPlayerPoint += 2;
    }
};

function flipTopCard(deck) {
    // "turn" top card over to face-up
    // if card.rank = Jack, return currentDealerPoint += 2
};

function flushCheck() {
    //if playerHand[]
}

function pairsCheck() {
    //if gameBoard[i].value === gameBoard[i-1]value, currentPlayerPoint +=2
    //if gameBoard[i].value === gamBoard[i-1]value && gameBoard[i-2], currentPlayerPoint +=6
    //if gameBoard[i].value === gameBoard[i-1]value && gameBoard[i-2] && gameBoard[i-3], currentPlayerPoint +=12
};

function runCheck() {
    //sort gameBoard[i]-gameBoard [0], if .values in consecutive order, +=point per card in run
    //run cannot span Count reset
}

function thrityOneCheck(currentPlayerPoint) {
    if (gameCount === 31) {
        return currentPlayerPoint += 2;
    }
};
//using Fisher-Yates Shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
}


