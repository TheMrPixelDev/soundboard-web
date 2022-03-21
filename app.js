var audio = new Audio();

        async function playSound(sound) {
                await audio.pause();
                audio = new Audio("sounds/" + sound + ".mp3")
                audio.play();
            
        }

        fetch("sounds.json").then(result => result.json().then(async buttons =>  {

            var categories = [];

            await buttons.sort((a, b) => {
                if(a.category < b.category){
                    return -1;
                }else{
                    return 0;
                }
            })

            console.log(buttons)

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
                button.onclick = () => playSound(b.sound);
                currentBtnContainer.appendChild(button);
                
            }
        }));