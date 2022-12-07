/**
 * Editor: TheMrPixelDev - Julian Harrer
 * Base forked from: FDHoho007
 * https://github.com/TheMrPixelDev/soundboard-web
 */

var audio = new Audio();
var soundsList = [];
var audioPlaying = false;

async function playSound(sound, title) {
    await audio.pause();
    audio = new Audio("sounds/" + sound + ".mp3")
    spawnMsgBox(title, sound);
    audio.play(); 
    window.navigator.vibrate([300]);
}

/**
 * Creates a div on the DOM which acts as a alert box
 */
function spawnMsgBox(soundTitle, soundName) {
    try {
        document.getElementById("msg-box").remove();
    }catch{
        console.log("There is no msg yet...")
    }
        
    const msgBox = document.createElement("div");
    msgBox.classList = "msg-box";
    msgBox.id= "msg-box";
    
    const progress = document.createElement("p");
    progress.innerHTML = "Loading audio..."
    
    const audioCtrlBtn = document.createElement("button");
    audioCtrlBtn.innerHTML = '<i class="fa-solid fa-spinner"></i>';
    audioCtrlBtn.classList = "action-btn blue"

    const audioShareBtn = document.createElement("button");
    audioShareBtn.innerHTML = '<i class="fa-solid fa-share-nodes"></i>'
    audioShareBtn.classList = "action-btn green"
    audioShareBtn.onclick = () => {
        shareSound(soundName);
    }


    audioCtrlBtn.addEventListener("click", () => {
        if(audioPlaying) {
            audioCtrlBtn.innerHTML = '<i class="fa-sharp fa-solid fa-play"></i>'
            audio.pause();
            audioPlaying = !audioPlaying
            console.log("stopping audio")
        }else{
            audioCtrlBtn.innerHTML = '<i class="fa-sharp fa-solid fa-pause"></i>'
            audio.play()
            audioPlaying = !audioPlaying
            console.log("resuming audio")
        }
        
    })

    msgBox.appendChild(audioCtrlBtn);
    msgBox.appendChild(progress);
    msgBox.appendChild(audioShareBtn);
    document.body.appendChild(msgBox);

    audio.addEventListener("ended", () => { msgBox.remove();})

    audio.oncanplay = () => {
        audioCtrlBtn.innerHTML = '<i class="fa-sharp fa-solid fa-pause"></i>';
    }

    audio.addEventListener("timeupdate", () => {
        progress.innerHTML = `${soundTitle} <br> ${(audio.currentTime / 60).toFixed(2)} <progress value="${audio.currentTime}" max="${audio.duration}"></progress> ${(audio.duration / 60).toFixed(2)}`
    })
}

/**
 * Handles sharing, when clicking the share button
 */
function shareSound(sound) {
    if(navigator.share){
        navigator.share({
            title: document.title,
            text: "Listen to the following sound.",
            url: "sounds/" + sound + ".mp3"
        })
    }else{
        navigator.clipboard.writeText(window.location.href + "sounds/" + sound + ".mp3");
        alert("Link has been copied to clipboard.")
    }
}

/**
 * Renders the buttons array on the DOM
 */

function renderButtons(buttons) {

    document.getElementsByTagName("main")[0].innerHTML = "";

    var prevCategory = "first";
    let currentBtnContainer;

    for (let b of buttons) {

        if(b.category != prevCategory) {
            let domCategory = document.createElement("div");
            currentBtnContainer = document.createElement("div");
            let title = document.createElement("h2");
            title.innerHTML = b.category.toUpperCase();
            domCategory.id = b.category;
            domCategory.classList = "category";
            domCategory.appendChild(title);
            domCategory.appendChild(currentBtnContainer);
            document.getElementsByTagName("main")[0].appendChild(domCategory);
            prevCategory = b.category;                    
        }

        let button = document.createElement("button");
        button.innerText = b.text;
        button.classList = b.color;
        button.onclick = () => playSound(b.sound, b.text);
        currentBtnContainer.appendChild(button);
    }
}

/**
 * Gets the list of all sounds
 */
fetch("sounds.json").then(result => result.json().then(sounds =>  {


    /**
     * Translates config versions
     */

    for(let category in sounds) {
        for(let sound of sounds[category]) {
            soundsList.push(
                {
                    "text": sound.text,
                    "sound": sound.sound,
                    "color": sound.color,
                    "category": category
                }
            )
        }
    }

    const path = window.location.href.split("/").pop();

    if(path != "") {
        soundsList = soundsList.filter(sound => {
            return sound.sound === path;
        })
        
        if(soundsList.length == 0) {
            document.getElementsByTagName("main")[0].innerHTML = "Der Sound " + path + " existiert nicht.";
            return;
        }
    }

    renderButtons(soundsList);

}));


/**
 * Implements the button search function
 */

var noSearchResult = 0;

document.getElementById("search").oninput = () => {
    var text = document.getElementById("search").value.toLowerCase();

    if(text.includes("dei m")) {
        document.getElementsByTagName("main")[0].innerHTML = `<h1>Sei einfach still 🖕</h1>`;
    } else {
        var searchedButtons = soundsList.filter((element) => {
        return element.text.toLowerCase().includes(text)
        })
        
        console.log(searchedButtons);

        if(searchedButtons.length < 1) {

            if(noSearchResult < 5) {
                noSearchResult++;
                document.getElementsByTagName("main")[0].innerHTML = `<h3 style="margin-top: 10%">Ey ich find halt nix...</h3>`;
            } else {
                document.getElementsByTagName("main")[0].innerHTML = `<h1 style="margin-top: 10%">Ey verpiss dich einfach 😡!</h1>`;
            }
        }else{
            noSearchResult = 0;
            renderButtons(searchedButtons);
        }

    }
}

/**
 * Device Shake Detection for random playback
 */
if("ondevicemotion" in window) {
    console.log("Device motion detection available!")
    var shakeEvent = new Shake({threshold: 15, timeout: 1000});
    shakeEvent.start();
    window.addEventListener("shake", () => {
        const index = Math.floor(Math.random() * soundsList.length);
        playSound(soundsList[index].sound, soundsList[index].text)
    }, false);
}else{
    console.log("Device motion detection not available!")
}

/**
 * Event Listener which triggers random playback
 */
document.getElementById("shuffle").addEventListener("click", e => {
    const index = Math.floor(Math.random() * soundsList.length);
    console.log(soundsList[index].text)
    playSound(soundsList[index].sound, soundsList[index].text)
});

/**
 * Event Listener which stops the current playback
 */
document.getElementById("stop").addEventListener("click", async e => {
    await audio.pause();
    try {
        document.getElementById("msg-box").remove();
    }catch{
        console.log("There is no msg yet...")
    }
})

document.getElementById("cancel").onclick = () => {
    document.getElementById("search").value = "";
    renderButtons(soundsList);
}


/**
 * Register the services worker for PWA
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
  }