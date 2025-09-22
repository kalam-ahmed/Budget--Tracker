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

// Add Budget
addAmountBtn.addEventListener("click", () => {
  let amountVal = Number(amountField.value);
  if (amountVal > 0) {
    budget = amountVal;
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
    // Add expense item
    let div = document.createElement("div");
    div.classList.add("expense-item");

    let itemNameBox = document.createElement("span");
    itemNameBox.innerText = itemName;

    let itemPriceBox = document.createElement("span");
    itemPriceBox.innerText = `Rs. ${priceVal}`;

    div.appendChild(itemNameBox);
    div.appendChild(itemPriceBox);
    expenseContainer.appendChild(div);

    // Update expenses and balance
    totalExpenses += priceVal;
    balance.innerText = `Balance: Rs. ${budget - totalExpenses}`;

    // Clear input fields
    addItem.value = "";
    itemPrice.value = "";
  }
});
