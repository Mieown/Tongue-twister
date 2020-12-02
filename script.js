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
const loser4 = new Audio("sounds/loser/zombie.wav");

//Arrays
const winnerSounds = [winner1, winner2, winner3, winner4, winner5];

const loserSounds = [loser1, loser2, loser3, loser4];

const tongueTwisterArray = [
  "How can a clam cram in a clean cream can I scream",
  "You scream we all scream for ice cream",
  "I saw a kitten eating chicken in the kitchen",
  "If a dog chews shoes whose shoes does he choose",
  "I thought I thought of thinking of thanking you",
  "Fred fed Ted bread and Ted fed Fred bread",
  "Which wristwatches are Swiss wristwatches",
  "I slit the sheet the sheet I slit and on the slitted sheet I sit",
  "nine nice night nurses nursing nicely",
  "Wayne went to wales to watch walruses",
  "If you need a program to program a program how do you program that program",
  "Which wristwatches are Swiss wristwatches",
  "So this is the sushi chef",
  "Can you can a can as a canner can can a can",
  "I wish to wash my Irish wristwatch",
  "A big black bear sat on a big black rug",
  "Tom threw Tim 3 thumb tacks",
  "He threw three free throws",
  "Four fine fresh fish for you",
  "We surely shall see the sun shine soon",
  "She sells seashells by the seashore", 
  "Happy hysterical Hyper Island students",
  "A happy hippo hopped and hiccupped",
  "Cooks cook cupcakes quickly",
  "A snake sneaks to seek a snack",
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
  //Speech recognition, transcribe what we are saying
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  speechOutput.textContent = transcript;

  //Make case insensitive and remove special characters
  let twisterText = tongueTwisterText.textContent.toLowerCase();
  const speechText = speechOutput.textContent.toLowerCase();
  const characters = /[.,;´?!]/g;
  let plainTwisterText = twisterText.replace(characters, "");

  //Count score
  const checkWords = speechText.split(" ");
  const facitWords = twisterText.split(" ");
    for (i=0; i<checkWords.length; i++) {
     var weHaveChecked = facitWords.includes(checkWords);
      console.log(weHaveChecked);
    }
  

  //Add score and animate
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
