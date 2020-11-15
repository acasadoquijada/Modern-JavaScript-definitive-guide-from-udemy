import * as UI from "./interfaz.js"

class API {
    constructor(artist, song) {
        this.artist = artist;
        this.song = song;

    }

    callAPI() {
        const url = `https://api.lyrics.ovh/v1/${this.artist}/${this.song}`

        fetch(url)
            .then( response => response.json())
            .then( response => {

                console.log(response);
                if(response.lyrics) {

                    const { lyrics } = response;

                    UI.resultDiv.textContent = lyrics;
                    UI.resultHeading.textContent = `${this.song} from ${this.artist}`;
                } else {
                    UI.msgDiv.textContent = "The song doesn't exist";
                    UI.msgDiv.classList.add("error");

                    setTimeout(() => {
                        UI.msgDiv.textContent = "";
                        UI.msgDiv.classList.remove("error");
                    }, 3000);
                }

            });
    }

}

export default API;