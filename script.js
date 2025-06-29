console.log("Welcome to Klyne");

// Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

// Song list
let songs = [
    { songName: "4x4", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "3:12" },
    { songName: "Highest in the Room", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "3:10" },
    { songName: "Fein", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "3:11" },
    { songName: "Sicko Mode", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "5:23" },
    { songName: "Goosebumps", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "4:10" },
    { songName: "i know?", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "3:31" },
    { songName: "Not like us", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "4:33" },
    { songName: "All the stars", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "3:50" },
    { songName: "My Eyes", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "4:55" },
    { songName: "NOKIA", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "4:01" }
];

// Render song list
const container = document.querySelector('.songItemContainer');
container.innerHTML = songs.map((song, i) => `
    <div class="songItem">
        <img src="${song.coverPath}" alt="Cover ${i + 1}">
        <span class="songName">${song.songName}</span>
        <span class="songlistplay">
            <span class="timestamp">${song.duration} <i id="${i}" class="fa-regular fa-circle-play songItemPlay"></i></span>
        </span>
    </div>
`).join('');

// Setup all play buttons
function setupSongItemPlays() {
    const songItemPlays = document.getElementsByClassName('songItemPlay');
    Array.from(songItemPlays).forEach((element) => {
        element.addEventListener('click', (e) => {
            const clickedIndex = parseInt(e.target.id);

            makeAllPlays(); // reset all icons
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');

            songIndex = clickedIndex;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        });
    });
}

// Reset all play icons
function makeAllPlays() {
    const songItemPlays = document.getElementsByClassName('songItemPlay');
    Array.from(songItemPlays).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

// Main play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        updatePlayIcon(songIndex); // sync icons
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        makeAllPlays();
    }
});

// Sync bottom bar icon
function updatePlayIcon(index) {
    makeAllPlays();
    const icon = document.getElementById(index);
    if (icon) {
        icon.classList.remove('fa-circle-play');
        icon.classList.add('fa-circle-pause');
    }
}

// Progress bar sync
audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seekbar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSongAtIndex(songIndex);
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSongAtIndex(songIndex);
});

// Play selected song
function playSongAtIndex(index) {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updatePlayIcon(index);
}

// Initialize buttons
setupSongItemPlays();


