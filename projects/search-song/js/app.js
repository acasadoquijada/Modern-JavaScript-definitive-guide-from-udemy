import * as UI from "./interfaz.js";
import API from "./api.js"

UI.searchFom.addEventListener("submit", searchSong);

function searchSong(e) {
    e.preventDefault();

    const artist = document.querySelector("#artista").value;
    const song = document.querySelector("#cancion").value;

    console.log(artist);
    console.log(song);

    if(artist === "" || song === "") {

        UI.msgDiv.textContent = "Fill all the fields";
        UI.msgDiv.classList.add("error");
        setTimeout(() => {
            UI.msgDiv.textContent = ""
            UI.msgDiv.classList.remove("error");
        }, 3000)
        return;
    }

    const search = new API(artist, song);
    search.callAPI();
}