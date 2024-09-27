let currentMusic = 0;
const music = document.querySelector("#audio");
const SongName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const seekBar = document.querySelector(".seek-bar");
const CurrentTime = document.querySelector(".current-time");
const songDurationTime = document.querySelector(".song-duration-time");
const playBtn = document.querySelector(".play-btn");
const playIcon = document.querySelector(".play-icon");
const forward = document.querySelector(".fa-forward");
const backward = document.querySelector(".fa-backward");

playBtn.addEventListener("click", () => {
    if (music.paused) {
        playBtn.classList.remove("play");
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
        disk.classList.add("play");
        music.play();
    } else {
        music.pause();
        playBtn.classList.add("play");
        playIcon.classList.add("fa-play");
        playIcon.classList.remove("fa-pause");
        disk.classList.remove("play");
    }
});

seekBar.addEventListener("change", () => {
    music.currentTime = seekBar.value;
});

// Setup music
function setMusic(i) {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;
    SongName.innerHTML = song.Name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    CurrentTime.innerHTML = "00:00";
    setTimeout(() => {
        seekBar.max = music.duration;
        songDurationTime.innerHTML = formatTime(music.duration);
    }, 300);
}

// Format the time
function formatTime(time) {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

// Update the seek bar and current time display
setInterval(() => {
    seekBar.value = music.currentTime;
    CurrentTime.innerHTML = formatTime(music.currentTime);
    if (CurrentTime.innerHTML === songDurationTime.innerHTML) {
        forward.click();
    }
}, 500);

setMusic(currentMusic);

forward.addEventListener("click", () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
});

backward.addEventListener("click", () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
});