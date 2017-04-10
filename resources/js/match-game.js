$(document).ready(function() {
  var cards = MatchGame.generateCardValues();
  var $game = $('#game');

  MatchGame.renderCards(cards, $game);
})

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var cardNumbers = [];
  for (var i = 1; i < 9; i++) {
    cardNumbers.push(i);
    cardNumbers.push(i);
  }

  var cardsRandIndex = [];
  for (var i = 0; i < 16; i++) {
    cardsRandIndex.push(0);
  }

  while (cardNumbers.length != 0) {
    var randIndex = getRandomIntInclusive(0, 15);

    if (cardsRandIndex[randIndex] == 0) {
      cardsRandIndex[randIndex] = cardNumbers.pop();
    }
  }

  return cardsRandIndex;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data("flippedCards", []);

  var colors = []
  colors.push("hsl(25, 85%, 65%)")
  colors.push("hsl(55, 85%, 65%)")
  colors.push("hsl(90, 85%, 65%)")
  colors.push("hsl(160, 85%, 65%)")
  colors.push("hsl(220, 85%, 65%)")
  colors.push("hsl(265, 85%, 65%)")
  colors.push("hsl(310, 85%, 65%)")
  colors.push("hsl(360, 85%, 65%)")

  $game.empty();

  for (var i = 0; i < cardValues.length; i++) {
    var htmlString = "<div class='card col-xs-3'></div>";
    var $card = $($.parseHTML(htmlString));
    $card.data("value", cardValues[i]);
    $card.data("isFlipped", false);
    $card.data("color", colors[cardValues[i] - 1]);

    $game.append($card);
  }

  $(".card").click(function() {
    console.log($(this).data("value"));
    MatchGame.flipCard($(this), $game);
  })
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($game.data("flippedCards") == $card) {
    return;
  }

  $card.css('background-color', $card.data("color"));
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
