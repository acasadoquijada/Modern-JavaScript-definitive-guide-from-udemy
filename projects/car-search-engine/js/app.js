// Variables
const brand = document.querySelector("#brand");
const year = document.querySelector("#year");
const minPrice = document.querySelector("#minimo");
const maxPrice = document.querySelector("#maximo");
const doors = document.querySelector("#doors");
const transmission = document.querySelector("#transmission");
const color = document.querySelector("#color");

const result = document.querySelector("#resultado");


const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;


const searchValues = {
    brand: "",
    year: "",
    minPrice: "",
    maxPrice: "",
    doors: "",
    transmission: "",
    color: "",    
}


// Events
document.addEventListener("DOMContentLoaded", () => {
    showCars();
    setYearOptions();
})

// EventListeners

brand.addEventListener("change", e => { 
    searchValues.brand = e.target.value 
    filterCar();
})

year.addEventListener("change", e => { 
    searchValues.year = e.target.value
      filterCar();
})
minPrice.addEventListener("change", e => {
    searchValues.minPrice = e.target.value
    filterCar()
})

maxPrice.addEventListener("change", e => { 
    searchValues.maxPrice = e.target.value
    filterCar();
})

doors.addEventListener("change", e => { 
    searchValues.doors = parseInt(e.target.value)
    filterCar();
})
transmission.addEventListener("change", e => { 
    searchValues.transmission = e.target.value
    filterCar();
})

color.addEventListener("change", e => {
    searchValues.color = e.target.value
    filterCar();
})

// Functions
function showCars(c=cars) {

    cleanCarsHTML();

    c.forEach( car => {

        const {brand, model, year, doors, transmission, price, color} = car
        const carHTML = document.createElement("p");


        carHTML.textContent = `
            ${brand}  ${model} -  ${year} -  ${doors} Doors - Transmission:  ${transmission} - Price:  ${price} - Color: ${color}
        `

        result.appendChild(carHTML);

    })
}

function cleanCarsHTML() {
    while(result.firstChild) {
        result.removeChild(result.firstChild);
    }
}

function setYearOptions() {

    for( let i = maxYear; i >= minYear; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }

}

function filterCar() {
    const result = cars
    .filter(filterBrand)
    .filter(filterYear)
    .filter(filterMinPrice)
    .filter(filterMaxPrice)
    .filter(filterDoors)
    .filter(filterTransmission)
    .filter(filterColor);

    if(result.length) {
        showCars(result)
    } else {
        cleanCarsHTML();
        showNoResults()
    }
}

function showNoResults() {
     const noResults = document.createElement("div");
     noResults.classList.add("alerta", "error");
     noResults.textContent = "No results";
     result.appendChild(noResults);
}

function filterBrand(car) {
    if(searchValues.brand) {
        return car.brand === searchValues.brand;
    }

    return car;
}

function filterYear(car) {
    if(searchValues.year) {
        return car.year === parseInt(searchValues.year);
    }
    return car;
}

function filterMinPrice(car) {
    if(searchValues.minPrice) {
        return car.price >= searchValues.minPrice;
    }
    return car;
}

function filterMaxPrice(car) {
    if(searchValues.maxPrice) {
        return car.price <= searchValues.maxPrice;
    }
    return car;
}

function filterDoors(car) {
    if(searchValues.doors) {
        return car.doors === searchValues.doors;
    }
    return car;
}

function filterTransmission(car) {
    if(searchValues.transmission) {
        return car.transmission === searchValues.transmission;
    }
    return car; 
}

function filterColor(car) {
    if(searchValues.color) {
        return car.color === searchValues.color;
    }
    return car;
}