// Variables
const form = document.querySelector("#formulario");
const tweetList = document.querySelector("#lista-tweets");
let tweetArray = [];

// Event listeners

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTweet)

    document.addEventListener("DOMContentLoaded", () => {
        tweetArray = JSON.parse(localStorage.getItem("tweetArray")) || [];
        createTweetHTML();
    }); 
}

// Functions
function addTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector("#tweet").value;

    if(tweet === "") {
        showError("Tweet cannot be empty")
    } else {
        const tweetObject = {
            id: Date.now(),
            tweet
        }
    
        tweetArray.push(tweetObject);

        createTweetHTML();
    }

}

function createTweetHTML() {

    cleanTweetListHTML();

    tweetArray.forEach( t => {

        const deleteBtn = document.createElement("a");
        deleteBtn.classList.add("borrar-tweet");
        deleteBtn.innerText = "X";

        deleteBtn.onclick = () => {
            deleteTweet(t.id);
        }

        const li = document.createElement("li");
        li.innerText = t.tweet;

        li.appendChild(deleteBtn);

        tweetList.appendChild(li);
    })

    syncStorage();

    form.reset();
}

function deleteTweet(id) {
    tweetArray = tweetArray.filter(tweet => tweet.id !== id);
    createTweetHTML();  
}

function syncStorage() {
    localStorage.setItem("tweetArray", JSON.stringify(tweetArray));
}

function cleanTweetListHTML() {
    while(tweetList.firstChild) {
        tweetList.removeChild(tweetList.firstChild);
    }
}

function showError(msg) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = msg;
    errorMessage.classList.add("error");
    const container = document.querySelector("#contenido");
    container.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 3000);
}