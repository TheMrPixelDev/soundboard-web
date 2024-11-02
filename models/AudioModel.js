import { getAllSounds, getSoundBySoundName } from './SoundsModel';

/**
 * @typedef {import('./SoundsModel').Sound} Sound
 */

const audioSource = new Audio();

/**
 * @param {Sound} sound
 */
export async function playSound(sound) {
    await audioSource.pause();
    audioSource.src = 'sounds/' + sound.sound + '.mp3';
    //spawnMsgBox(title, sound);
    audioSource.play();
    /*if (loadSettings().vibrate) {
        window.navigator.vibrate([300]);
    }*/
}

/**
 *
 * @param {string} sound
 */
export async function playSoundBySoundName(sound) {
    const sound = await getSoundBySoundName(sound);
    if (sound !== null) {
        await audioSource.pause();
        audioSource.src = 'sounds/' + sound + '.mp3';
    }
}

export async function stopSound() {
    await audioSource.pause();
}
