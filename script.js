//Get information from HTML --------------
const startRecordingBtn = document.querySelector(".record-btn");
const getNewTwisterBtn = document.querySelector(".get-twister-btn");
const getQuotesBtn = document.querySelector(".get-quote-btn");

const tongueTwisterText = document.querySelector(".tongue-twister");
const speechOutput = document.querySelector(".speech-output");
const score = document.querySelector(".score");
const containerScore = document.querySelector(".container-score");

// Audio
const winner1 = new Audio("sounds/winner/fanfare.mp3");
const winner2 = new Audio("sounds/winner/halleluja.wav");
const winner3 = new Audio("sounds/winner/okay.wav");
const winner4 = new Audio("sounds/winner/woohoo.mp3");
const winner5 = new Audio("sounds/winner/yesyesyes.wav");

const loser1 = new Audio("sounds/loser/boo.wav");
const loser2 = new Audio("sounds/loser/loser.wav");
const loser3 = new Audio("sounds/loser/scream.wav");
const loser4 = new Audio("sounds/loser/triste.wav");
const loser5 = new Audio("sounds/loser/zombie.wav");

//Arrays
const winnerSounds = [winner1, winner2, winner3, winner4, winner5];

const loserSounds = [loser1, loser2, loser3, loser4, loser5];

const tongueTwisterArray = [
  "How can a clam cram in a clean cream can I scream",
  "You scream we all scream for ice cream",
  "I saw a kitten eating chicken in the kitchen",
  "If a dog chews shoes whose shoes does he choose",
  "I thought I thought of thinking of thanking you",
];

//Event listner -------------------------
if ("ontouchstart" in window) {
  getNewTwisterBtn.addEventListener("touchstart", getTongueTwister);
  getQuotesBtn.addEventListener("touchstart", getQuote);
  startRecordingBtn.addEventListener("touchstart", () => {
    recognition.start();
  });
} else {
  getNewTwisterBtn.addEventListener("click", getTongueTwister);
  getQuotesBtn.addEventListener("click", getQuote);
  startRecordingBtn.addEventListener("click", () => {
    recognition.start();
  });
}

//Set the speechrecognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// --- F U N C T I O N S -----
// Speech to text
recognition.onstart = function () {
  console.log("Det fungerar!");
};

recognition.onresult = function (event) {
  console.log(event);
};

function getLoserSound() {
  const loserSound =
    loserSounds[Math.floor(Math.random() * loserSounds.length)];
  loserSound.play();
}

function getWinnerSound() {
  const winnerSound =
    winnerSounds[Math.floor(Math.random() * winnerSounds.length)];
  winnerSound.play();
}

recognition.onresult = function (event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  speechOutput.textContent = transcript;
  let twisterText = tongueTwisterText.textContent.toLowerCase();
  const speechText = speechOutput.textContent.toLowerCase();
  const characters = /[.,;´?!]/g;
  let plainTwisterText = twisterText.replace(characters, "");
  containerScore.classList.remove("hidden");
  containerScore.style.animation = "bam 0.5s ease-in-out";
  if (twisterText == speechText) {
    score.innerText = "YEYYY you did it correct!!";
    getWinnerSound();
  } else if (plainTwisterText == speechText) {
    score.innerHTML = "YASSSS,,,,,,,, <br>you did it correct!!";
    getWinnerSound();
  } else {
    score.innerText = "Nooo! You failed!";
    getLoserSound();
  }
};

//Get random Array
function getTongueTwister() {
  const randomTwister =
    tongueTwisterArray[Math.floor(Math.random() * tongueTwisterArray.length)];
  tongueTwisterText.textContent = randomTwister;
  resetText();
}

function resetText() {
  speechOutput.textContent = "";
  score.innerText = "";
  speechOutput.style.color = "black";
  tongueTwisterText.style.color = "black";
  containerScore.classList.add("hidden");
  containerScore.style.animation = "none";
}

//Get random Quotes from API
function getQuote() {
  fetch("https://api.quotable.io/random?maxLength=60")
    .then((response) => response.json())
    .then(resetText())
    .then((data) => (tongueTwisterText.innerText = data.content))
    .catch(
      (error) => (tongueTwisterText.textContent = "ERROR ERROR ERROR Try again")
    );
}
