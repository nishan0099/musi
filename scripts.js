document.getElementById('search-button').addEventListener('click', function() {
    performSearch();
});

document.getElementById('search-bar').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

const playButtons = document.querySelectorAll('.play-button');
const audioPlayer = document.getElementById('audio-player');
const musicController = document.querySelector('.music-controller');
const playPauseButton = document.getElementById('play-pause');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup');

playButtons.forEach(button => {
    button.addEventListener('click', () => {
        const song = button.getAttribute('data-song');
        audioPlayer.src = song;
        audioPlayer.play();
        musicController.classList.remove('hidden');
        playPauseButton.textContent = '⏸';
    });
});

playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = '⏸';
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = '⏯';
    }
});

audioPlayer.addEventListener('pause', () => {
    musicController.classList.add('hidden');
    playPauseButton.textContent = '⏯';
});

const volumeSlider = document.getElementById('volume');
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value / 100;
});

closePopupButton.addEventListener('click', () => {
    popup.classList.add('hidden');
});

function performSearch() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            const musicList = document.getElementById('music-list');
            musicList.innerHTML = '';
            
            if (response.total > 0) {
                response.data.forEach(track => {
                    const li = document.createElement('li');
                    li.innerHTML = `${track.title} <button class="play-button" data-song="${track.preview}">Play</button>`;
                    musicList.appendChild(li);
                });
                document.querySelectorAll('.play-button').forEach(button => {
                    button.addEventListener('click', () => {
                        const song = button.getAttribute('data-song');
                        audioPlayer.src = song;
                        audioPlayer.play();
                        musicController.classList.remove('hidden');
                        playPauseButton.textContent = '⏸';
                    });
                });
            } else {
                popup.classList.remove('hidden');
            }
        }
    });

    xhr.open('GET', `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`);
    xhr.setRequestHeader('x-rapidapi-key', 'ca9fafef67mshba6939ea657d413p10d1b2jsn0f7cacafb2f4');
    xhr.setRequestHeader('x-rapidapi-host', 'deezerdevs-deezer.p.rapidapi.com');

    xhr.send(data);
}
