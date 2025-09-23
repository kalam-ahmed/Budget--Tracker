let amountField = document.querySelector("#amount-field");
let addAmountBtn = document.querySelector("#add-amount");
let totalAmount = document.querySelector("#total-amount");
let balance = document.querySelector("#balance");
let expenseContainer = document.querySelector(".expense-list");
let addItem = document.querySelector("#add-item");
let itemPrice = document.querySelector("#item-price");
let addExpensesBtn = document.querySelector("#add-expenses-btn");

let budget = 0;
let totalExpenses = 0;

// ✅ Helper: Create expense element with delete button
function createExpenseElement(exp) {
  let div = document.createElement("div");
  div.classList.add("expense-item");

  let itemNameBox = document.createElement("span");
  itemNameBox.innerText = exp.name;

  let itemPriceBox = document.createElement("span");
  itemPriceBox.innerText = `Rs. ${exp.price}`;

  let itemDeleteBtn = document.createElement("button");
  itemDeleteBtn.innerText = "X";
  itemDeleteBtn.classList.add("delete-btn");

  // ✅ Delete logic
  itemDeleteBtn.addEventListener("click", () => {
    expenseContainer.removeChild(div);

    // Update totals
    totalExpenses -= exp.price;
    balance.innerText = `Balance: Rs. ${budget - totalExpenses}`;

    // Update localStorage
    let savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let updatedExpenses = savedExpenses.filter(
      e => !(e.name === exp.name && e.price === exp.price)
    );
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  });

  div.appendChild(itemNameBox);
  div.appendChild(itemPriceBox);
  div.appendChild(itemDeleteBtn);
  return div;
}

// Load from localStorage when page loads
window.addEventListener("DOMContentLoaded", () => {
  const savedBudget = localStorage.getItem("budget");
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

  if (savedBudget) {
    budget = Number(savedBudget);
    totalAmount.innerText = `Total: Rs. ${budget}`;
  }

  if (savedExpenses.length > 0) {
    totalExpenses = savedExpenses.reduce((sum, exp) => sum + exp.price, 0);
    balance.innerText = `Balance: Rs. ${budget - totalExpenses}`;

    savedExpenses.forEach(exp => {
      let div = createExpenseElement(exp);
      expenseContainer.appendChild(div);
    });
  }
});

// Add Budget
addAmountBtn.addEventListener("click", () => {
  let amountVal = Number(amountField.value);
  if (amountVal > 0) {
    budget += amountVal;
    localStorage.setItem("budget", budget); // Save budget
    totalAmount.innerText = `Total: Rs. ${budget}`;
    balance.innerText = `Balance: Rs. ${budget - totalExpenses}`;
    amountField.value = "";
  }
});

// Add Expenses
addExpensesBtn.addEventListener("click", () => {
  let itemName = addItem.value;
  let priceVal = Number(itemPrice.value);

  if (itemName !== "" && priceVal > 0) {
    let exp = { name: itemName, price: priceVal };

    // Add to UI
    let div = createExpenseElement(exp);
    expenseContainer.appendChild(div);

    // Update totals
    totalExpenses += priceVal;
    balance.innerText = `Balance: Rs. ${budget - totalExpenses}`;

    // Save expense in localStorage
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    savedExpenses.push(exp);
    localStorage.setItem("expenses", JSON.stringify(savedExpenses));

    // Clear input fields
    addItem.value = "";
    itemPrice.value = "";
  }
});
