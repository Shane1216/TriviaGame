var gameContainer = $('#game-area');
var countStartNumber = 30;

//Click events for start button and guess buttons

$(document).on('click', '#restart', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

//Set of questions for the game

var questions = [{
  question: "If you found yourself at the Mountains of Madness, where would you be?",
  answers: ["Peru", "South Africa", "Tibet", "Antarctica"],
  correctAnswer: "Antarctica",
  image:"assets/images/antarctica.jpg"
}, {
  question: "What is the name of the university referred to in H.P Lovecraft's stories?",
  answers: ["Arkham University", "Miskatonic University", "The University of Dunwich", "Innsmouth University"],
  correctAnswer: "Miskatonic University",
  image:"assets/images/miskatonic.jpg"
}, {
  question: "Which story of Edgar Allan Poe is referenced in H.P. Loevecraft's At the Mountains of Madness?",
  answers: ["The Mystery of Marie Roget", "The Gold Bug", "The Narrative of Arthur Gordon Pym of Nantucket", "The Masque of the Red Death"],
  correctAnswer: "The Narrative of Arthur Gordon Pym of Nantucket",
  image:"assets/images/arthur.jpg"
}, {
  question: 'Which now mainstream scientific theory was novel and controversial at the time H.P. Lovecraft incorporated it into his novel, At the Mountains of Madness?',
  answers: ["The Big Bang Theory", "DNA and the molecular transmission of genetic information", "Quantum Physics", "Continental Drift and tectonic plates"],
  correctAnswer: "Continental Drift and tectonic plates",
  image:"assets/images/mountains.jpg"
}, {
  question: 'H.P Lovecraft was born in which city?',
  answers: ["Boston", "Los Angeles", "Providence", "Indianapolis"],
  correctAnswer: "Providence",
  image:"assets/images/providence.jpg"
}];

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    gameContainer.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      gameContainer.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    gameContainer.html('<h2>Out of Time!</h2>');
    gameContainer.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    gameContainer.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    gameContainer.html('<h2>Results</h2>');
    $('#counter-number').html(game.counter);
    gameContainer.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    gameContainer.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    gameContainer.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    gameContainer.append('<br><button id="restart">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    gameContainer.html('<h2>Incorrect</h2>');
    gameContainer.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    gameContainer.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    gameContainer.html('<h2>Correct</h2>');
    gameContainer.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};