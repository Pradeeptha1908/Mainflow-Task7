let products = [];
let buyers = [];

// Add product
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let productName = document.getElementById('product-name').value;
    let productPrice = document.getElementById('product-price').value;

    products.push({ name: productName, price: productPrice });
    displayProducts();
    document.getElementById('product-form').reset();
});

// Add buyer
document.getElementById('buyer-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let buyerName = document.getElementById('buyer-name').value;
    let buyerContact = document.getElementById('buyer-contact').value;
    let buyerEmail = document.getElementById('buyer-email').value;
    let buyerAddress = document.getElementById('buyer-address').value;

    buyers.push({
        name: buyerName,
        contact: buyerContact,
        email: buyerEmail,
        address: buyerAddress
    });

    displayBuyers();
    document.getElementById('buyer-form').reset();
});

// Display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${product.name} - $${product.price}
            <button class="update-btn" onclick="updateProduct(${index})">Update</button>
            <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>`;
        productList.appendChild(li);
    });
    updateProductCheckboxes();
}

// Display buyers
function displayBuyers() {
    const buyerList = document.getElementById('buyer-list');
    buyerList.innerHTML = '';
    buyers.forEach((buyer, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${buyer.name} - ${buyer.contact}, ${buyer.email}, ${buyer.address}
            <button class="update-btn" onclick="updateBuyer(${index})">Update</button>
            <button class="delete-btn" onclick="deleteBuyer(${index})">Delete</button>`;
        buyerList.appendChild(li);
    });
    updateBuyerSelect();
}

// Update product
function updateProduct(index) {
    const newName = prompt("Enter new product name:", products[index].name);
    const newPrice = prompt("Enter new product price:", products[index].price);
    if (newName !== null && newPrice !== null) {
        products[index] = { name: newName, price: newPrice };
        displayProducts();
    }
}

// Update buyer
function updateBuyer(index) {
    const buyer = buyers[index];
    const newName = prompt("Enter new buyer name:", buyer.name);
    const newContact = prompt("Enter new buyer contact:", buyer.contact);
    const newEmail = prompt("Enter new buyer email:", buyer.email);
    const newAddress = prompt("Enter new buyer address:", buyer.address);

    if (newName && newContact && newEmail && newAddress) {
        buyers[index] = {
            name: newName,
            contact: newContact,
            email: newEmail,
            address: newAddress
        };
        displayBuyers();
    }
}

// Delete product
function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

// Delete buyer
function deleteBuyer(index) {
    buyers.splice(index, 1);
    displayBuyers();
}

// Search
function searchItems() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = document.getElementById('search-results');
    results.innerHTML = '';

    const matchedProducts = products.filter(p => p.name.toLowerCase().includes(query));
    const matchedBuyers = buyers.filter(b => b.name.toLowerCase().includes(query));

    if (matchedProducts.length > 0) {
        results.innerHTML += '<strong>Products:</strong><ul>';
        matchedProducts.forEach(p => results.innerHTML += `<li>${p.name} - $${p.price}</li>`);
        results.innerHTML += '</ul>';
    }

    if (matchedBuyers.length > 0) {
        results.innerHTML += '<strong>Buyers:</strong><ul>';
        matchedBuyers.forEach(b => results.innerHTML += `<li>${b.name} - ${b.contact}</li>`);
        results.innerHTML += '</ul>';
    }
}

// Bill functionality
function updateBuyerSelect() {
    const select = document.getElementById('buyer-select');
    select.innerHTML = '';
    buyers.forEach((buyer, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `${buyer.name} - ${buyer.contact}`;
        select.appendChild(opt);
    });
}

function updateProductCheckboxes() {
    const list = document.getElementById('product-select-list');
    list.innerHTML = '';
    products.forEach((product, i) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="checkbox" id="product-${i}" value="${i}">
            <label for="product-${i}">${product.name} - $${product.price}</label>`;
        list.appendChild(div);
    });
}

function generateBill() {
    const buyerIndex = document.getElementById('buyer-select').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const selected = document.querySelectorAll('#product-select-list input[type="checkbox"]:checked');

    if (buyerIndex === '' || selected.length === 0) {
        alert('Please select a buyer and at least one product.');
        return;
    }

    const buyer = buyers[buyerIndex];
    let selectedProducts = [];
    let total = 0;

    selected.forEach(cb => {
        const product = products[cb.value];
        selectedProducts.push(product);
        total += parseFloat(product.price);
    });

    const transactionId = 'TXN' + Math.floor(Math.random() * 1000000);
    let html = `
        <h3>Bill for ${buyer.name}</h3>
        <p><strong>Contact:</strong> ${buyer.contact}</p>
        <p><strong>Email:</strong> ${buyer.email}</p>
        <p><strong>Address:</strong> ${buyer.address}</p>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <ul>`;

    selectedProducts.forEach(p => {
        html += `<li>${p.name} - $${p.price}</li>`;
    });

    html += `</ul><strong>Total: $${total.toFixed(2)}</strong>`;
    document.getElementById('bill-output').innerHTML = html;
}
