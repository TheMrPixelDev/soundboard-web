import { getAllSoundsBySearchTerm } from '../models/SoundsModel';

/** Event Listener for opening the settings menue */
document.getElementById('settings-btn').onclick = openSettingsMenu;

/** Event Listener for toggeling the dark mode  */
document.getElementById('darkmode-input').addEventListener('click', (e) => {
    if (e.target.checked) {
        document.querySelector('body').classList.remove('light');
    } else {
        document.querySelector('body').classList.add('light');
    }
});

/** Event Listener for the cancel button of the searchbar */
document.getElementById('cancel').onclick = () => {
    document.getElementById('search').value = '';
    renderButtons(soundsList);
};

/**
 * Event Listener which stops the current playback
 */
document.getElementById('stop').addEventListener('click', async (e) => {
    await audio.pause();
    try {
        document.getElementById('msg-box').remove();
    } catch {
        console.log('There is no msg yet...');
    }
});

/**
 * Set the visibility of the bottom bar.
 * @param {string} label
 * @param {string} playingStatus
 */
export function BottomBar(label, playingStatus) {
    const bottomBar = document.getElementById('bottom-bar');
    if (playingStatus === 'playing' || playingStatus === 'paused') {
        bottomBar.style.display = 'block';
    } else {
        bottomBar.style.display = 'none';
    }
    bottomBar.querySelector('#bottom-bar-label').textContent = label;

    const playButton = bottomBar.querySelectorAll('#bottom-bar-play-button')[0];
    const pauseButton = bottomBar.querySelectorAll('#bottom-bar-pause-button')[0];
    const stopButton = bottomBar.querySelectorAll('#bottom-bar-stop-button')[0];
    if (playingStatus === 'playing') {
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
        stopButton.style.display = 'block';
    } else if (playingStatus === 'paused') {
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        stopButton.style.display = 'block';
    } else if (playingStatus === 'stopped') {
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        stopButton.style.display = 'none';
    }
}

/**
 * @param {string | undefined} searchTerm
 */
export function SoundButtonList(searchTerm) {
    const buttonListContainer = document.querySelectorAll('main')[0];
    if (searchTerm !== undefined && searchTerm !== null) {
        getAllSoundsBySearchTerm(searchTerm).then(
            (sounds) => (buttonListContainer.innerHTML = sounds.map(SoundButton).join(''))
        );
    } else {
    }
}

/**
 *
 * @param {import("../models/SoundsModel").Sound} sound
 */
export function SoundButton(sound) {
    return `<button style="backgroundColor: ${sound.color}">${sound.text}</button>`;
}
