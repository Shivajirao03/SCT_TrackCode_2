const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const resetButton = document.getElementById('reset');
const lapTimesList = document.getElementById('lap-times');

let intervalId = null;
let startTime = 0;
let elapsedTime = 0;

function formatTime(time) {
  const milliseconds = time % 1000;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  const hours = Math.floor(time / 3600000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function startTimer() {
  if (!intervalId) {
    startTime = Date.now();
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timer.textContent = formatTime(elapsedTime);
    }, 10);
  }
}

function pauseTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function resumeTimer() {
  if (!intervalId) {
    startTime = Date.now() - elapsedTime;  // Adjust startTime to account for the previous elapsed time
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timer.textContent = formatTime(elapsedTime);
    }, 10);
  }
}


function resetTimer() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = null;
  startTime = 0;
  elapsedTime = 0;
  timer.textContent = formatTime(elapsedTime);
  lapTimesList.innerHTML = '';
}

function addLapTime() {
  // ... (same logic as before)
}

startButton.addEventListener('click', () => {
  startTimer();
});

pauseButton.addEventListener('click', pauseTimer);

resumeButton.addEventListener('click', resumeTimer);

resetButton.addEventListener('click', resetTimer);