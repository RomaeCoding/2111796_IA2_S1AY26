/* ================= IA#2 - CART SYSTEM ================= */

let cart = JSON.parse(localStorage.getItem('cart')) || [];

/* SAVE CART */
function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

/* ADD TO CART */
function addToCart(product){
    let existing = cart.find(item => item.title === product.title);

    if(existing){
        existing.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    saveCart();
    alert("Added to cart!");
}

/* REMOVE ITEM */
function removeItem(index){
    cart.splice(index,1);
    saveCart();
    renderCart();
}

/* INCREASE */
function increaseQuantity(index){
    cart[index].quantity++;
    saveCart();
    renderCart();
}

/* DECREASE */
function decreaseQuantity(index){
    if(cart[index].quantity > 1){
        cart[index].quantity--;
    } else {
        cart.splice(index,1);
    }
    saveCart();
    renderCart();
}

/* ================= RENDER CART ================= */
function renderCart(){
    const container = document.getElementById('cartContainer');
    const totalEl = document.getElementById('totalPrice');

    if(!container) return;

    container.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item,index)=>{
        subtotal += item.price * item.quantity;

        container.innerHTML += `
        <div class="cart-item">
            <span>${item.title}</span>
            <span>$${item.price}</span>
            <span>${item.quantity}</span>
            <button data-index="${index}" class="removeBtn">Remove</button>
        </div>`;
    });

    let tax = subtotal * 0.15;
    let discount = subtotal > 100 ? 10 : 0;
    let total = subtotal + tax - discount;

    totalEl.innerHTML = `
    Subtotal: $${subtotal.toFixed(2)} <br>
    Tax: $${tax.toFixed(2)} <br>
    Discount: $${discount.toFixed(2)} <br>
    <strong>Total: $${total.toFixed(2)}</strong>`;

    /* EVENT LISTENERS */
    document.querySelectorAll(".removeBtn").forEach(btn=>{
        btn.addEventListener("click",(e)=>{
            removeItem(e.target.dataset.index);
        });
    });
}

/* ================= LOGIN ================= */
function login(){
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('loginMsg');

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let user = users.find(u => u.username === username && u.password === password);

    if(user){
        localStorage.setItem('loggedInUser', username);
        msg.textContent = "Login successful!";
    } else {
        msg.textContent = "Invalid credentials";
    }
}

/* ================= REGISTER ================= */
function register(){
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(!name || !dob || !username || !email || !password){
        alert("All fields required");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({name,dob,username,email,password});

    localStorage.setItem('users', JSON.stringify(users));
    alert("Registered!");
}

/* ================= CHECKOUT ================= */
function placeOrder(){
    alert("Order placed!");
    localStorage.removeItem('cart');
}

function clearCart(){
    localStorage.removeItem('cart');
    renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);