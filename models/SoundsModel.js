/**
 * @typedef {{ sound: string, text: string, color: string }} Sound
 * @typedef {Object<string, Array<Sound>>} SoundResult
 */

/** @type {SoundResult?} */
let sounds = null;

/**
 * Used to access a list of all sounds
 * @returns {Sound[]}
 */
export async function getAllSounds() {
    if (sounds === null) {
        sounds = await fetchSounds();
    }
    /** @type {Sound[]} */
    let totalSounds = [];
    Object.entries(sounds).forEach((category) => (totalSound = totalSounds.concat(category[1])));
    return totalSounds;
}

/**
 * Used to get all categories of sounds
 * @returns {string[]}
 */
export async function getCategories() {
    if (sounds === null) {
        sounds = await fetchSounds();
    }
    return Object.keys(sounds);
}

/**
 * Used to get all sound of a certain category
 * @param {string} category
 * @returns {Sound[]?}
 */
export async function getAllSoundsOfCategory(category) {
    if (sounds === null) {
        sounds = await fetchSounds();
    }
    return sounds[category];
}

/**
 * @param {string} searchTerm
 */
export async function getAllSoundsBySearchTerm(searchTerm) {
    const sounds = await getAllSounds();
    return sounds.filter((sound) => sound.sound.includes(searchTerm) || sound.text.includes(searchTerm));
}

/**
 *
 * @param {string} sound
 */
export async function getSoundBySoundName(sound) {
    const result = (await getAllSounds()).filter((sound) => sound.sound === sound);
    if (result.length === 0) {
        return null;
    } else {
        return result[0];
    }
}

async function fetchSounds() {
    const result = await fetch('/sounds.json');
    const parsedSoundsResult = result.json();
    return parsedSoundsResult;
}
