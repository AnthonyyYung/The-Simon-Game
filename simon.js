let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  // Reset user pattern on each new sequence
  userClickedPattern = [];

  // Increment level and update display
  level++;
  $("#level-title").text("Level " + level);

  const randomNumber = Math.floor(Math.random() * buttonColours.length);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  const buttonId = "#" + randomChosenColour;
  $(buttonId).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function(event) {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animate(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  switch (name) {
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
  }
}

function animate(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $(".btn").removeClass("pressed");
  }, 100);
}

let started = false;
let level = 0;

$("#start").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success!");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1500);
    }
  } else {
    console.log("Wrong");
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("#level-title").text("Game Over, Press Start Button to Restart")

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100)

    startOver();
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

