// initialize card variables
let cards = [];
let cardTable = document.querySelector(".card-table");
let firstCard = null;
let secondCard = null;
let noFlip = false;
let triesRemaining = 10;
let winCounter = null; // we will update this win counter on every match

// display the triesRemaining to the user
let counter = document.querySelector(".tries-remaining");
counter.textContent = triesRemaining;

// implement the Fetch API to grab the card JSON file
async function loadCards() {
  try {
    const response = await fetch("./data/card_info.json");
    const data = await response.json();
    winCounter = data.length;
    cards = [...data, ...data];
    const shuffledCards = shuffle();

    // deal out cards
    dealCards(shuffledCards);
  } catch (error) {
    console.error(error);
  }
}

// define our shuffle function
function shuffle() {
  const shuffleCardsArray = [...cards];
  const totalCards = shuffleCardsArray.length;
  let currentIndex = totalCards - 1;

  // OPTION 1
  // Loop through the array from the last element to the first
  for (currentIndex; currentIndex > 0; currentIndex--) {
    // generate a random index between - and currentIndex (inclusive)
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    // swap the elements at currentIndex and randomIndex using a temporary variable
    // const randomCard = shuffleCardsArray[randomIndex];
    // shuffleCardsArray[randomIndex] = shuffleCardsArray[currentIndex];
    // shuffleCardsArray[currentIndex] = randomCard;
    [shuffleCardsArray[currentIndex], shuffleCardsArray[randomIndex]] = [
      shuffleCardsArray[randomIndex],
      shuffleCardsArray[currentIndex],
    ];
  }

  // OPTION 2
  // Swap elements using destructuring assignment in JS
  return shuffleCardsArray;
}

function dealCards(shuffledCards) {
  let fragment = document.createDocumentFragment();

  // for (const card of cards) {
  //   let cardElement = document.createElement("div");
  //   cardElement.classList.add("card");
  //   cardElement.setAttribute("data-name", card.name);

  //   // add the front and back of the card
  //   cardElement.innerHTML = `
  //     <div class="back">
  //       <img src="${card.image}" alt="${card.name}" />
  //     </div>
  //     <div class="front">
  //     </div>
  //   `;

  //   cardTable.appendChild(cardElement);
  // }

  // OPTION: using fragment
  for (const card of shuffledCards) {
    // create out entire card
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    // create both the front and back of the card
    // FRONT of card
    const frontCardDiv = document.createElement("div");
    frontCardDiv.classList.add("front");

    // BACK of card
    const backCardDiv = document.createElement("div");
    backCardDiv.classList.add("back");

    // add image to the back of the card
    const img = document.createElement("img");
    img.classList.add("back-image");
    img.src = card.image;
    backCardDiv.appendChild(img);

    // append our front and back of the card, to the card itself
    cardElement.append(backCardDiv, frontCardDiv);

    // attach our card to the fragment
    fragment.appendChild(cardElement);
  }

  // append the entire fragment to the live DOM
  cardTable.appendChild(fragment);

  // attack click event listener after all cards are added
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => card.addEventListener("click", flipCard));
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  noFlip = false;
}

function setCardBackground(card, color) {
  card.children[0].style.backgroundColor = color;
}

function disableCards() {
  --winCounter;
  console.log("winCounter", winCounter);
  if (winCounter === 0) {
    setTimeout(() => {
      alert("You won the game!");
      let starInterval = setInterval(createStars, 300);
      setTimeout(() => {
        clearInterval(starInterval);
      }, 5000);
    }, 1000);
  }

  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  setCardBackground(firstCard, "#74d174");
  setCardBackground(secondCard, "#74d174");
  resetCards();
}

function unFlipCards() {
  setTimeout(() => {
    // examine whether the user has lost the game
    triesRemaining--;
    counter.textContent = triesRemaining;
    if (triesRemaining === 0) {
      // alert("You lost the game!");
      showImageOverlay();
      return;
    }
    // flip cards back over by removing CSS class
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetCards();
  }, 1000);
}

function checkForMath() {
  return firstCard.dataset.name === secondCard.dataset.name
    ? disableCards()
    : unFlipCards();
}

function flipCard() {
  if (noFlip || this === firstCard) return;
  // add a css class to activate the flip effect
  this.classList.add("flipped");

  // grab first card flipped over (clicked)
  if (!firstCard) {
    firstCard = this;
    return;
  }

  // grab second card flipped over (clicked)
  secondCard = this;
  noFlip = true;
  checkForMath();
}

function showImageOverlay() {
  // create the div wrapper
  const wrapper = document.createElement("div");
  wrapper.classList.add("image-overlay"); // adding this class for CSS styling

  // create the image child
  const img = document.createElement("img");
  img.src = "./images/loser.jpg";

  // append the image as a child to the wrapper div
  wrapper.appendChild(img);

  // finally, append the wrapper to the DOM
  document.body.appendChild(wrapper);

  // transition the opacity of the wrapper to 1
  requestAnimationFrame(() => {
    {
      wrapper.style.opacity = 1;
    }
  });
}

function createStars() {
  const star = document.createElement("div");
  star.classList.add("star");
  // style our stars
  const randomX = Math.floor(Math.random() * window.innerWidth);
  // const randomY = Math.floor(Math.random() * window.innerHeight);
  star.style.left = `${randomX}px`;
  const duration = Math.random() * 2 + 3;
  star.style.animationDuration = `${duration}s`;

  // append our star to its wrapper div
  document.getElementsByClassName("star-wrapper")[0].appendChild(star);

  // remove the star after the animation duration
  star.addEventListener("animationend", () => {
    star.remove();
  });

  // star.style.top = `${randomY}px`;
  // document.body.appendChild(star);
  // setTimeout(() => {
  //   star.remove();
  // }, 1000);
}
loadCards();
