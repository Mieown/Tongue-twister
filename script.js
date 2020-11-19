//Get information from HTML
const startRecordingBtn = document.querySelector(".record-btn");
const getNewTwisterBtn = document.querySelector(".new-twister-btn");

const tongueTwisterText = document.querySelector(".tongue-twister");
const speechOutput = document.querySelector(".speech-output");
const score = document.querySelector(".score");

//Event listner
startRecordingBtn.addEventListener("click", () => {
  recognition.start();
});

getNewTwisterBtn.addEventListener("click", getTongueTwister);

//Set the speechrecognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//Arrays
const tongueTwisterArray = [
  "How can a clam cram in a clean cream can I scream",
  "You scream we all scream for ice cream",
  "I saw a kitten eating chicken in the kitchen",
  "If a dog chews shoes whose shoes does he choose",
  "I thought I thought of thinking of thanking you",
];

// --- F U N C T I O N S -----
// Speech to text
recognition.onstart = function () {
  console.log("Det fungerar!");
};

recognition.onresult = function (event) {
  console.log(event);
};

recognition.onresult = function (event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  speechOutput.textContent = transcript;
  let twisterText = tongueTwisterText.textContent.toLowerCase();
  const speechText = speechOutput.textContent.toLowerCase();
  if (twisterText == speechText) {
    score.innerText = "YEYYY you did it correct!!";
  } else {
    score.innerText = "Nooo! You failed!";
  }
};

//Get random Array
function getTongueTwister() {
  const randomTwister =
    tongueTwisterArray[Math.floor(Math.random() * tongueTwisterArray.length)];
  tongueTwisterText.textContent = randomTwister;
  speechOutput.textContent = "";
  score.innerText = "";
}
