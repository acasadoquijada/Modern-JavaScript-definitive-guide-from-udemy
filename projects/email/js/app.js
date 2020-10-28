// Variables
const sendBtn = document.querySelector("#enviar");
const resetBtn = document.querySelector("#resetBtn");
const form = document.querySelector("#enviar-mail");

const email = document.querySelector("#email");
const subject = document.querySelector("#asunto");
const mesage = document.querySelector("#mensaje");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// Set listeners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',startApp);

    email.addEventListener("blur", validateForm);
    subject.addEventListener("blur", validateForm);
    mesage.addEventListener("blur", validateForm);

    resetBtn.addEventListener("click", resetForm);

    form.addEventListener("submit", sendEmail);
}


// Functions
function startApp() {
    disableSendButton();
}

function validateForm(e) {

    if(e.target.value.length > 0) {
        checkAndRemoveError(e);
    } else {
        showError(e, "All fields are required");
    }

    if(e.target.type === "email") {

        if(er.test(e.target.value)) {
            checkAndRemoveError(e);
        } else {
            showError(e, "Email not valid")
        }
    }

    if(er.test(email.value) && subject.value != "" && mesage.value != "") {
        enableSendButton();
    }

}

function disableSendButton() {
    updateSendButton(true);
}

function enableSendButton() {
    updateSendButton(false);
}

function updateSendButton(state) {
    sendBtn.disable = state;
    if(state) {
        sendBtn.classList.add("cursor-not-allowed", "opacity-50");
    } else {
        sendBtn.classList.remove("cursor-not-allowed", "opacity-50");
    }
}

function checkAndRemoveError(e) {
    checkError();
    setNotErrorClassList(e);
}

function checkError() {
    const error = document.querySelector("p.error");
    if(error) {
        error.remove();
    }
}

function showError(e, mesage) {
    setErrorClassList(e);
    showErrorMessage(mesage);
}

function setNotErrorClassList(e) {
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
}

function setErrorClassList(e) {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
}

function showErrorMessage(mesage) {

    const errors = document.querySelectorAll(".error");

    // We check if we are showing the error message
    if(errors.length == 0) {
        const errorMesage = document.createElement("p");
        errorMesage.textContent = mesage;
        errorMesage.classList.add("border", "border-red-500", "background-red-100", "text-red-500", "p-3","mt-5", "text-center", "error");
        form.insertBefore(errorMesage, document.querySelector(".mb-10"));
    }
}

function sendEmail(e) {
    e.preventDefault();

    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    setTimeout(() => {
         spinner.style.display = "none";

         const parragraph = document.createElement("p");
         parragraph.textContent = "Mesage sent";
         parragraph.classList.add("text-center", "my-10", "p-2", "bg-green-500", "text-white", "font-bold", "uppercase");

         form.insertBefore(parragraph, spinner);

         setTimeout(() => {
             parragraph.remove();
             resetForm();
         }, 5000)
    }, 3000);
}

function resetForm() {
    form.reset();
    startApp();
}