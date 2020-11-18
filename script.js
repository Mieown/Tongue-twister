const startRecordingBtn = document.querySelector(".record-btn");
const getNewTwisterBtn = document.querySelector(".new-twister-btn");

const tongueTwisterText = document.querySelector(".tongue-twister");
const speechOutput = document.querySelector(".speech-output");


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    console.log("Det fungerar!");
};

recognition.onresult = function(event) {
    console.log(event);
}

startRecordingBtn.addEventListener("click", () => {
    recognition.start();
});

