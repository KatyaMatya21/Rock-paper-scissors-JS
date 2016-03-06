document.addEventListener("DOMContentLoaded", function () {

  var computerPlayer = document.querySelector(".computer .choise__list");
  var allChoises = document.querySelectorAll(".choise");

  var arrChoises = ["rock", "paper", "scissors"];

  var gameBtn = document.querySelector(".game__button");

  var gameProgress = document.querySelector(".game__progress");

  /**
   * get random choise
   * @returns {string}
   */
  function getRandomChoise() {
    return arrChoises[Math.floor(Math.random() * arrChoises.length)];
  }

  var computerChoice;
  var userChoice;

  var userChoiceList = document.querySelectorAll(".user .choise");

  for (var i = 0; i < userChoiceList.length; i++) {
    userChoiceList[i].addEventListener("click", userClick);
  }

  var intervalId;
  var flag = false;

  /**
   * Choise
   * @param e
   * @returns {boolean}
   */
  function userClick(e) {
    if (flag) {
      return false;
    }
    e.preventDefault();
    flag = true;
    var targetTab = this.dataset.choise;
    for (var i = 0; i < userChoiceList.length; i++) {
      userChoiceList[i].classList.add("disabled");
    }
    this.classList.remove('disabled');
    this.classList.add('this');
    userChoice = targetTab;
    computerChoice = getRandomChoise();


    gameProgress.classList.add('active');

    newContent();
    intervalId = setInterval(newContent, 600);
  }

  var text = ["rock..", "scissors..", "paper..", "one..", "two..", "three"];
  var currentText = 0;

  var list = ["rock", "scissors", "paper"];
  var item = 0;

  /**
   * Progress game
   */
  function newContent() {
    gameProgress.innerHTML = text[currentText];
    currentText = currentText + 1;

    if (item >= list.length) {
      item = 0;
    }
    if (computerPlayer.querySelector('.this')) {
      computerPlayer.querySelector('.this').classList.remove('this');
    }
    computerPlayer.querySelector('.choise[data-choise="' + list[item] + '"]').classList.add('this');

    item = item + 1;
    if (currentText >= text.length) {
      clearInterval(intervalId);
      computerPlayer.querySelector('.this').classList.remove('this');
      compare(userChoice, computerChoice);
    }
  }

  var flagUserWin = false;
  var flagCompWin = false;

  /**
   * Compare
   * @param choice1
   * @param choice2
   */
  function compare(choice1, choice2) {

    computerPlayer.querySelector('.choise[data-choise="' + choice2 + '"]').classList.add('this');

    if (choice1 === choice2) {
      gameProgress.innerHTML = "tie!";
      flagCompWin = true;
    }

    else if (choice1 === "rock") {

      if (choice2 === "scissors") {
        gameProgress.innerHTML = "rock wins!";

        flagUserWin = true;
      }
      else {
        gameProgress.innerHTML = "paper wins!";
      }
    }

    else if (choice1 === "paper") {

      if (choice2 === "rock") {
        gameProgress.innerHTML = "paper wins!";
        flagUserWin = true;
      }
      else {
        gameProgress.innerHTML = "scissors wins!";
      }
    }

    else if (choice1 === "scissors") {

      if (choice2 === "rock") {
        gameProgress.innerHTML = "rock wins!";
      }
      else {
        gameProgress.innerHTML = "scissors wins!";
        flagUserWin = true;
      }
    }

    if (flagUserWin) {
      document.querySelector("audio").setAttribute("src", "audio/win.wav");
      document.querySelector("audio").setAttribute("autoplay", "true");
    } else {
      if (flagCompWin) {
        document.querySelector("audio").setAttribute("src", "audio/error.wav");
        document.querySelector("audio").setAttribute("autoplay", "true");
      } else {
        document.querySelector("audio").setAttribute("src", "audio/fail.wav");
        document.querySelector("audio").setAttribute("autoplay", "true");
      }
    }
  }

  /**
   * Click "Try again"
   */
  gameBtn.addEventListener('click', function () {

    for (var i = 0; i < allChoises.length; i++) {
      allChoises[i].classList.remove("disabled");
      allChoises[i].classList.remove("this");
    }

    gameProgress.classList.remove('active');
    currentText = 0;
    flag = false;
    flagUserWin = false;
    flagCompWin = false;
  });

});
