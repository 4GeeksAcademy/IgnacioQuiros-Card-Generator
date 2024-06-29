/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

//Calling for the first cards to generate and start the countdown function for generate each 10s
window.onload = function() {
  randomCardGenerator();
  callGenerator();
};

function randomCardGenerator() {
  let randomNumbers = generateRandomNumbers();
  let randomIcons = generateRandomIcons();
  renderCards(randomNumbers, randomIcons);
}

//Generating numbers between: 2 and 14 (including them)
function generateRandomNumbers() {
  let numbers = [];
  for (let index = 0; index < 5; index++) {
    let randomNumber = Math.floor(Math.random() * 13) + 2;
    // Special values down here
    if (randomNumber === 11) {
      numbers.push("J");
    } else if (randomNumber === 12) {
      numbers.push("Q");
    } else if (randomNumber === 13) {
      numbers.push("K");
    } else if (randomNumber === 14) {
      numbers.push("A");
    } else {
      numbers.push(randomNumber.toString());
    }
  }
  return numbers;
}

//Function to generate random icons between: ♦, ♥, ♠, ♣
function generateRandomIcons() {
  let icons = [];
  for (let index = 0; index < 5; index++) {
    let randomNumber = Math.floor(Math.random() * 4);
    if (randomNumber === 0) {
      icons.push("♦");
    } else if (randomNumber === 1) {
      icons.push("♥");
    } else if (randomNumber === 2) {
      icons.push("♠");
    } else if (randomNumber === 3) {
      icons.push("♣");
    }
  }
  return icons;
}

// Function for getting bootstrap color class depending on the icon
function getTextColorClass(icon) {
  switch (icon) {
    case "♥":
      return "text-danger";
    case "♣":
      return "text-primary";
    case "♦":
      return "text-warning";
    default:
      return "text-dark";
  }
}

// Rendering the cards with the info gave by the other 3 functions
function renderCards(numbers = [], icons = []) {
  let cardsDiv = document.querySelector("#allCards");
  cardsDiv.innerHTML = ""; // cleaning each time we generate it

  for (let index = 0; index < 5; index++) {
    let textColorClass = getTextColorClass(icons[index]);
    let cardHTML = `<div class="card bg-light justify-content-between mb-3">
      <div class="d-flex ps-2">
        <i  class="icon ${textColorClass}">${icons[index]}</i>
      </div>
      <div  class="d-flex justify-content-center align-items-center myHeight">
        <p class="number mx-auto">${numbers[index]}</p>
      </div>
      <div class="d-flex justify-content-end pe-2 ">
        <i style="transform: rotate(3.142rad) " class="icon ${textColorClass}">${icons[index]}</i>
      </div>
    </div>`;

    //For making more than one that would be innerhtml instead
    cardsDiv.insertAdjacentHTML("beforeend", cardHTML);
  }
}

//Button to generate instant new cards
let buttonClickMe = document.querySelector("#generateButton");
buttonClickMe.addEventListener("click", () => {
  randomCardGenerator();
});

//Function we use for making a call to randomCardGenerator every 10s (Using setTimeOut)
let seconds = 10;
function callGenerator() {
  let llamadasCount = 0;
  function llamarRandomCardGenerator() {
    llamadasCount++;
    if (llamadasCount % 10 === 0) {
      seconds = 10;
      randomCardGenerator();
    }
    let timeToGenerate = document.querySelector("#timeToCall");
    timeToGenerate.innerHTML = seconds;
    seconds--;
    console.log(`Segundos transcurridos: ${seconds}`);
    setTimeout(llamarRandomCardGenerator, 1000);
  }
  llamarRandomCardGenerator();
}
