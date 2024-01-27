let video = document.querySelector('video');
let bar = document.querySelector('.progress-bar');
let play = document.querySelector('.play');
let resume = document.querySelector('.ten-before');
let skip = document.querySelector('.ten-after');
let volume = document.querySelector('.volume-ico');
let time = document.querySelector('p')
let controlVolume = document.querySelector('.volume-control');
let timeout;
let isInteractingWithProgressBar = false;
let oldValue;

video.addEventListener('mousemove', ()=>{
  clearTimeout(timeout)
  document.querySelector('.bar').style.display = "flex";
  document.querySelector('.control').style.display = "flex"
  video.style.cursor = "auto"
  if(video.paused == false) {
    timeout = setTimeout(() => {
      document.querySelector('.bar').style.display = "none";
      document.querySelector('.control').style.display = "none"
      video.style.cursor = "none"
    }, 3000);
  }
})

video.addEventListener('loadeddata', ()=> {
  bar.setAttribute('max', video.duration)
  updateTime();
});

play.addEventListener('click',()=>{
  pauseOrPlay();
})

video.addEventListener('click', ()=>{
  pauseOrPlay();
})

video.addEventListener('timeupdate', () => {
  if (!isInteractingWithProgressBar) {
    document.querySelector('.left').style.width = ((video.currentTime / video.duration) * 100) + "%";
    bar.value = video.currentTime;
    updateTime();
  }
});

bar.addEventListener('input', () => {
  isInteractingWithProgressBar = true;
});

bar.addEventListener('change', () => {
  video.currentTime = bar.value;
  updateTime();
  isInteractingWithProgressBar = false;
});

resume.addEventListener('click',()=>{
  video.currentTime -= 10;
  bar.value -= 10;
})

skip.addEventListener('click',()=>{
  bar.value = parseInt(bar.value) + 10;
  video.currentTime = parseInt(video.currentTime) + 10;
})

volume.addEventListener('click',()=>{
  if(video.muted == false) {
    oldValue = controlVolume.value
    video.muted = true;
    controlVolume.value = 0;
  } else {
    video.muted = false;
    controlVolume.value = oldValue;
  }
  volumeIco()
})

controlVolume.addEventListener('change',()=>{
  video.volume = controlVolume.value / 100;
  volumeIco()
})

window.addEventListener('keydown', (e)=>{
  if(e.key == " ") {
    pauseOrPlay()
  } else if(e.key == "ArrowRight") {
    bar.value = parseInt(bar.value) + 10;
    video.currentTime = parseInt(video.currentTime) + 10;
  } else if(e.key == "ArrowLeft") {
    bar.value -= 10;
    video.currentTime -= 10;
  } else if(e.key == "ArrowUp") {
    controlVolume.value = parseInt(controlVolume.value) + 10;
    video.volume = controlVolume.value / 100;
    volumeIco()
  } else if(e.key == "ArrowDown") {
    controlVolume.value -= 10;
    video.volume = controlVolume.value / 100;
    volumeIco()
  }
})

function updateTime(){
  let timeLeft = video.duration - video.currentTime;
  minutes = Math.floor(timeLeft / 60);
  seconds = Math.floor(timeLeft % 60);
  time.innerHTML = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
}

function pauseOrPlay(){
  let played = document.querySelector('.played')
  let paused = document.querySelector('.paused')
  if(video.paused == false) {
    video.pause()
    played.style.display = 'none';
    paused.style.display = 'block';
  } else {
    video.play()
    played.style.display = 'block';
    paused.style.display = 'none';
  }
}

function volumeIco(){
  document.querySelector('.full').style.display = "none"
  document.querySelector('.one').style.display = "none"
  document.querySelector('.zero').style.display = "none"
  document.querySelector('.mute').style.display = "none"
  if(controlVolume.value > 60) {
    document.querySelector('.full').style.display = "block"
  } else if(controlVolume.value > 35) {
    document.querySelector('.one').style.display = "block"
  } else if(controlVolume.value > 0) {
    document.querySelector('.zero').style.display = "block"
  } else {
    document.querySelector('.mute').style.display = "block"
  }
}