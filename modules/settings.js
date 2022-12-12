export function loadSettings() {
    const vibrate = localStorage.getItem("vibrate") === null || localStorage.getItem("vibrate") == "true";
    const darkmode = localStorage.getItem("darkmode") === null || localStorage.getItem("darkmode") == "true";
    return { vibrate, darkmode }
}

export function saveSettings(settings) {
    localStorage.setItem("vibrate", settings.vibrate);
    localStorage.setItem("darkmode", settings.darkmode);
}

export function openSettingsMenu() {
    document.getElementById("settings-background").style.display = "block";
    const settings = loadSettings();
    console.log(settings)
    document.getElementById("vibration-input").checked = settings.vibrate;
    document.getElementById("darkmode-input").checked = settings.darkmode;
    document.getElementById("save-settings").onclick = closeSettingsMenu;
}

function closeSettingsMenu() {
    const vibrate = document.getElementById("vibration-input").checked;
    const darkmode = document.getElementById("darkmode-input").checked;
    saveSettings({vibrate, darkmode})
    document.getElementById("settings-background").style.display = "none";
}