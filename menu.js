let order = [];

function updateOrder() {
  event.preventDefault(); // Prevent form from submitting

  const form = event.target.closest("form");
  const name = form.dataset.name;
  const price = parseFloat(form.dataset.price);
  const quantityInput = form.querySelector('input[name="quantity"]');
  const quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity < 1) {
    alert("Please enter a valid quantity.");
    return;
  }
  
  // Check if item already exists
  const existingItem = order.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.total = existingItem.quantity * existingItem.price;
  } else {
    order.push({ name, price, quantity, total: price * quantity });
  }

  quantityInput.value = '';
  displayOrderSummary();
}

function displayOrderSummary() {
  const orderList = document.getElementById("order-list");
  const totalAmount = document.getElementById("total-amount");

  orderList.innerHTML = "";
  let total = 0;

  order.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (Qty. ${item.quantity}) - ₱${item.total}`;
    orderList.appendChild(li);
    total += item.total;
  });

  totalAmount.textContent = `Total: ₱${total}`;
}

function pay() {
  const moneyInput = document.getElementById("money-input");
  const amountPaid = parseFloat(moneyInput.value);
  const total = order.reduce((sum, item) => sum + item.total, 0);

  if (order.length === 0) {
    alert("Order is empty. Please add items before paying.");
    return;
  }

  if (isNaN(amountPaid) || amountPaid <= 0) {
    alert("Please enter a valid payment amount.");
    return;
  }
  
  if (amountPaid >= total) {
    const change = amountPaid - total;
    const confirmPayment = confirm("Proceed with payment?");
    if (confirmPayment){
      alert(`Thanks for Ordering! Here's your ₱${change.toFixed(2)} Change.`);

      // Reset all
      order = [];
      moneyInput.value = "";
      displayOrderSummary();
    }
  } else {
    const short = total - amountPaid;
    alert(`Insufficient amount. Total is ₱${total}. You need ₱${short.toFixed(2)} more.`);
  }
}
