/**
 * Editor: TheMrPixelDev - Julian Harrer
 * Base forked from: FDHoho007
 * https://github.com/TheMrPixelDev/soundboard-web
 */

var audio = new Audio();
var soundsList = [];

async function playSound(sound, title) {
    await audio.pause();
    audio = new Audio("sounds/" + sound + ".mp3")
    spawnMsgBox(title);
    audio.play(); 
}

/**
 * Creates a div on the DOM which acts as a alert box
 */
function spawnMsgBox(soundTitle) {
    try {
        document.getElementById("msg-box").remove();
    }catch{
        console.log("There is no msg yet...")
    }
    const msgBox = document.createElement("div");
        msgBox.classList = "msg-box";
        msgBox.id= "msg-box";
        msgBox.innerHTML = `<p>Playing "${soundTitle}"</p>`;
        setTimeout(() => {
            msgBox.remove();
        }, 4000);
        document.body.appendChild(msgBox);
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
fetch("sounds.json").then(result => result.json().then(async buttons =>  {
    await buttons.sort((a, b) => {
        if(a.category < b.category){
            return -1;
        }else{
            return 0;
        }
    });

    soundsList = buttons;
    renderButtons(buttons);

    /*var prevCategory = "first";
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
        soundsList = buttons;
    }*/
}));


/**
 * Implements the button search function
 */
document.getElementById("search").oninput = () => {
    var text = document.getElementById("search").value;
    var searchedButtons = soundsList.filter((element) => {
        return element.text.toLowerCase().includes(text.toLowerCase())
    })

    console.log(searchedButtons);
    renderButtons(searchedButtons);
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