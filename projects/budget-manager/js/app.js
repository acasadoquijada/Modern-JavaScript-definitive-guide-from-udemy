const form = document.querySelector("#agregar-gasto");
const expenses = document.querySelector("#gastos ul");

class Budget {
    constructor(budget) {
        this.budget = Number(budget)
        this.remaining = Number(budget)
        this.expenseList = [];
    }

    addExpense(expense) {
        this.expenseList.push(expense);
        this.calculateRemaining();
    }

    deleteExpense(id) {
        this.expenseList = this.expenseList.filter( expense => expense.id !== id );
        this.calculateRemaining();
    }

    calculateRemaining() {
        const totalExpenses = this.expenseList.reduce( (total, expense) => total + expense.quantity, 0 )  
        this.remaining = this.budget - totalExpenses;
    }
}

class UI {
    setBudget(customerBudget) {
        const {budget, remaining} = customerBudget;

        document.querySelector("#total").textContent = budget;
        document.querySelector("#restante").textContent = remaining;
    }

    showAlert(msg, type) {

        const div = document.createElement("div");
        div.classList.add("text-center", "alert");

        if(type === "error") {
            div.classList.add("alert-danger");
        } else {
            div.classList.add("alert-success")
        }

        div.textContent = msg;

        document.querySelector(".primario").insertBefore(div, form);

        setTimeout(() => {
            div.remove();
        }, 3000)
    }

    showExpenses(expenseList) {

        this.cleanHTML();

        expenseList.forEach( expense =>  {
            const {quantity, name, id} = expense;

            const li = document.createElement("li");

            li.classList = "list-group-item d-flex justify-content-between align-items-center";
            li.dataset.id = id;

            li.innerHTML = `${name} <span class="badge badge-primary badge-pill">${quantity} </span>
            `;

            const deleteButton = document.createElement("button");
            deleteButton.onclick = () => {
                deleteExpense(id);
            }

            deleteButton.innerHTML = "Delete &times"
            deleteButton.classList.add("btn", "btn-danger", "borrar-gasto");

            li.appendChild(deleteButton);

            expenses.appendChild(li);

        })

    }

    cleanHTML() {
        while(expenses.firstChild){
            expenses.removeChild(expenses.firstChild);
        }  
    }

    updateRemaining(remaining) {
        document.querySelector("#restante").textContent = remaining;
    }

    checkBudget(customerBudget) {

        const {budget, remaining} = customerBudget;

        const remainingDiv = document.querySelector(".restante");

        if( (budget / 4) > remaining ) {
            remainingDiv.classList.remove("alert-success");
            remainingDiv.classList.add("alert-danger");
        } else if( (budget / 2) > remaining) {
            remainingDiv.classList.remove("alert-success");
            remainingDiv.classList.add("alert-warning");
        } else {
            remainingDiv.classList.remove("alert-warning", "altert-danger");
            remainingDiv.classList.add("alert-success");
        }

        if(remaining <= 0) {
            thi1s.showAlert("No budget remaining", "error");
            form.querySelector('button[type="submit"]').disabled = true;
        }
    }
}

let customerBudget //= new Budget();
let ui = new UI();

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", askBudget);
    form.addEventListener("submit", addExpense);

}


function askBudget() {
    const budget = prompt("Set budget");

    if(budget === "" || budget === null || isNaN(budget) || budget <= 0 ) {
        window.location.reload();
    }

    customerBudget = new Budget(budget);

    ui.setBudget(customerBudget);
}

function addExpense(e) {
    e.preventDefault();

    const name = document.querySelector("#gasto").value;
    const quantity = Number(document.querySelector("#cantidad").value);


    if(name === "" || quantity === "") {
        ui.showAlert("Fill both fields", "error");
    } else if( quantity <= 0 || isNaN(quantity)) {
        ui.showAlert("Invalid quantity", "error");
    }

    const expense = { name, quantity, id:Date.now() };

    customerBudget.addExpense(expense);

    ui.showAlert("Expense added", "success")

    const { expenseList, remaining} = customerBudget;
    
    ui.updateRemaining(remaining);

    ui.showExpenses(expenseList);

    ui.checkBudget(customerBudget);

    form.reset();
}

function deleteExpense(id) {
    customerBudget.deleteExpense(id);

    const { expenseList, remaining} = customerBudget;

    ui.updateRemaining(remaining);

    ui.showExpenses(expenseList);

    ui.checkBudget(customerBudget);
}