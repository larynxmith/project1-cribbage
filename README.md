# Cribbage

Thanks for coming to my game. This is a labor of love, so there is much room for improvement; do not hesitate to send your thoughts along!

You can play the current version of the game here: https://larynxmith.github.io/Cribbage/


The history of Cribbage is long(over 400 years) and varied; consider looking over the following links in your spare time:

https://en.wikipedia.org/wiki/Cribbage
https://en.wikisource.org/wiki/Hoyle%27s_Games_Modernized/Cribbage
https://en.wikipedia.org/wiki/Rules_of_cribbage

However here's a quick summary of the Rules:

Cribbage is a turn-based, point-accumulating game, where a Game Win is when a player first reaches 121 points. Over the years,  a peg board has been devised, cunningly called a Cribbage Board, with which you keep track of the many types of point generation quickly by moving the pegs in accordance to the point value.


![Cribbage Board](https://mmtcdn.blob.core.windows.net/084395e6770c4e0ebc5612f000acae8f/mmtcdn/Products1727-640x640-1977191873.jpg)

The game itself is broken down into Phases:

DEAL PHASE
-Each player cuts the deck to establish who is the dealer for the first round of play (lowest card, A-King, deals first).
-Shuffle deck(52 card, no joker)
-The Pone(non-dealer)cuts deck(Dealer-1 if >2 players)
-Deal 6 cards( for standard 2-person variant)

CRIB PHASE
-Players take turns(Pone first) discarding two cards of choice from their hand to the "Crib"(discard pile, to be used later), next to the Deck.

START PHASE
-Dealer exposes new top card; if the Top Card  is a Jack(called "His Heels," or "Nibs"), the Dealer is instantly awarded 2 points.

PLAY PHASE--
-Pone lays first card on the Board, followed by the Dealer, with each player calling out the "Count," the current value of the cards on the Board added together(Face Cards are valued as 10, at this stage) .
-Count cannot exceed 31
     -if player cannot lay <=31, they must call "Go" and other player plays until they can no longer play.
-after 31 is reached, or no more lays available, count is Reset to 0 and play resumes until all cards have been played.

-Points within Play Phase(all relevant combos within play count; cannot span a Reset, Run cannot span a Pair):
     -15 Count = 2pts , calling "Fifteen for Two"
     -31 Count = 2pts, calling "31 for Two"
     -if no 31, last lay = 1pt "<Count> for One"(includes Last Card Played)
     -Runs
          -three consecutive cards(regardless of order) = 3pts
          -four consecutive cards = 4pts
          -five consecutive cards = 5pts
          -six consecutive cards = 6pts
          -seven consecutive cards = 7pts
     -Pairs
          -Pair = 2pts
          -Three of a Kind = 6 pts ("Pair Royal"--three pairs--1,2; 1,3, 2,3)
          -Four of Kind = 12 pts ("Double Pair Royal"--six pairs--1,2; 1,3; 1,4; 2,3; 2,4; 3,4)

SHOW PHASE--
Once the Play Phase is complete, each player(Pone first) evaluates their hand, plus the Top Card(totaling 5 cards), to the following point-generation scenarios:
     -Flush
          -In-Hand Four-Card Flush = 4 pts(additional 1pt if Top Card matches)
     -Jack of same suit as Start Card ("His Nobs") = 1pt
     -Double Run(2-2-3-4--2 runs, 1 pair) = 8pts
     -Triple Run(2-2-2-3-4--3 runs, 1 three-of-a-kind) = 15pts
     -Double-Double Run(2-2-3-3-4--4runs, 2 pairs) = 16pts
     -Fifteen for Two = 2pts
-After Dealer Shows, the Crib is exposed, and it is evaluated as an additional hand for the Dealer(same rules apply, except Flush only counts if it is all five cards).

END PHASE--
--at any time, 121pts = WIN--
     -Game ends
     -1 Match Point added(best-of-Odd series, or Odd total, for a longer version)
     -Board  is reset
     -Deal passes
     -Play again!
-If 121 is reached before opponent reaches 91 = 1 Extra Match Points("Skunk")==2 total Match Points
-If 121 is reached before opponent reaches 61 = 2 Extra Match Points("Double Skunk") in addition==4 total Match Points
-If 121 is reached before opponent reaches 31 = Automatic Match Win("Triple Skunk")


Simple....right?

Don't worry, it comes naturally after a while; keep playing until it does! ;)


The super-slick deck generation and card movement comes from a JavaScript created by Einar Egilsson: https://github.com/einaregilsson/cards.js. The cards were artfully designed by Nicu Buculei, available in the public domain at: http://clipart-library.com/openclipart.org.html.