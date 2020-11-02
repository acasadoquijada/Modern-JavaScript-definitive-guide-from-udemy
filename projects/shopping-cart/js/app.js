// Variables
const cart = document.querySelector("#carrito");
const cartContainer = document.querySelector("#lista-carrito tbody");
const emptyCartButton = document.querySelector("#vaciar-carrito");
const courseList = document.querySelector("#lista-cursos");
let cartElements = [];

setEventListeners();

function setEventListeners() {

    courseList.addEventListener("click", addCourse);

    cart.addEventListener("click", deleteCourse);

    emptyCartButton.addEventListener("click", clearCart);

    document.addEventListener("DOMContentLoaded", () => {
        cartElements = JSON.parse(localStorage.getItem("cartElements")) || []
        updateCartHTML();
    })
}

function clearCart() {
    cartElements = [];
    cleanHTML();
}

function addCourse(e) {
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")) {
        getCourseData(e.target.parentElement.parentElement);
    }
}

function deleteCourse(e) {
    if(e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");
        cartElements = cartElements.filter(curso => curso.id !== cursoId);
        updateCartHTML();
    }
}

function getCourseData(course) {

    const courseInfo = {
        image: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector(".precio span").textContent,
        id: course.querySelector("a").getAttribute("data-id"),
        quantity: 1
    }

    const courseExists = cartElements.some(curso => curso.id === courseInfo.id); 

    if(courseExists) {

        const cursos = cartElements.map(curso => {
           if(curso.id === courseInfo.id){
               curso.quantity++;
               return curso;
           } else {
               return curso;
           }

        })

        cartElements = [...cursos]

    } else {
        cartElements = [...cartElements, courseInfo];
    }

    updateCartHTML();
}

// Muestra el carrito en HTML

function updateCartHTML() {

    // Limpiar HTML
    cleanHTML();
    cartElements.forEach((curso) => {
        const {image, title, price, quantity, id} = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${image}" width="100">
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${quantity}</td>

            <td>
                <a href="#" class="borrar-curso" data-id=${id}> X </a> 
            </td>
        `
        // agrega html
        cartContainer.appendChild(row);
    })

    syncStorage();
}

function syncStorage() {
    localStorage.setItem("cartElements", JSON.stringify(cartElements))
}

function cleanHTML() {
    while(cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    }
}