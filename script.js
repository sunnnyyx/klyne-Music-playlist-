console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

// Updated song list with names, covers, durations
let songs = [
    { songName: "4x4", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "3:10" },
    { songName: "Highest in the Room", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "2:55" },
    { songName: "Fien", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "3:11" },
    { songName: "Sicko Mode", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "5:12" },
    { songName: "Sin City", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "4:28" },
    { songName: "Take What You Want", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "3:49" },
    { songName: "TaTaTa", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "2:30" },
    { songName: "Telekinesis", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "5:53" },
    { songName: "My Eyes", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "4:11" },
    { songName: "Lose", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "3:20" }
];

// Dynamically generate song list in HTML
const container = document.querySelector('.songItemContainer');
container.innerHTML = songs.map((song, i) => `
    <div class="songItem">
        <img src="${song.coverPath}" alt="Cover ${i + 1}">
        <span class="songName">${song.songName}</span>
        <span class="songlistplay">
            <span class="timestamp">${song.duration} <i id="${i}" class="far songItemPlay fa-play-circle"></i></span>
        </span>
    </div>
`).join('');

// Re-select play buttons after HTML injection
let songItems = Array.from(document.getElementsByClassName('songItemPlay'));

// Master play/pause button logic
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update seekbar while song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seekbar control
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Make all play buttons show play icon
const makeAllPlays = () => {
    songItems.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Individual song item play button logic
songItems.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? 0 : songIndex - 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

