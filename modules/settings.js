export function loadSettings() {
    const vibrate = localStorage.getItem("vibrate") === null || localStorage.getItem("vibrate") == "true";
    const darkmode = localStorage.getItem("darkmode") === null || localStorage.getItem("darkmode") == "true";
    const shake = localStorage.getItem("shake") === null || localStorage.getItem("shake") == "true";
    const random_colors = localStorage.getItem("random_colors") == null || localStorage.getItem("random_colors") == "true";
    return { vibrate, darkmode, shake, random_colors }
}

export function saveSettings(settings) {
    localStorage.setItem("vibrate", settings.vibrate);
    localStorage.setItem("darkmode", settings.darkmode);
    localStorage.setItem("shake", settings.shake);
    localStorage.setItem("random_colors", settings.random_colors);
}

export function openSettingsMenu() {
    document.getElementById("settings-background").style.display = "block";
    const settings = loadSettings();
    document.getElementById("vibration-input").checked = settings.vibrate;
    document.getElementById("darkmode-input").checked = settings.darkmode;
    document.getElementById("shake-input").checked = settings.shake;
    document.getElementById("random-colors-input").checked = settings.random_colors;
    document.getElementById("save-settings").onclick = closeSettingsMenu;
}

function closeSettingsMenu() {
    const vibrate = document.getElementById("vibration-input").checked;
    const darkmode = document.getElementById("darkmode-input").checked;
    const shake = document.getElementById("shake-input").checked;
    const random_colors = document.getElementById("random-colors-input").checked;
    saveSettings({vibrate, darkmode, shake, random_colors})
    document.getElementById("settings-background").style.display = "none";
}