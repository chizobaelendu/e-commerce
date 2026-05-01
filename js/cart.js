//Element Pointers
const cartContainerElem = document.getElementById("cartContainer");
const pageHeadingElem = document.getElementById("pageHeading");

//Get a single cart from server
async function getCart(cartId) {
    const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
    if (!response.ok) {
        throw new Error("Failed to get cart from server");
    } else {
        const cart = await response.json();
        return cart;
    };
};

//Decrease product quantity 
async function decreaseQuantity(cartId, productId) {
    try {
        const cart = await getCart(cartId);
        cart.products.forEach((cartProduct) => {
            if (cartProduct.productId === productId) {
                cartProduct.quantity = cartProduct.quantity - 1;
                console.log(cartProduct.quantity);
                return;
            };
        });
    } catch (error) {
        window.alert(error.message);
        console.log(error);
    };
};

//Increase product quantity 
async function increaseQuantity(cartId, productId) {
    try {
        const cart = await getCart(cartId);
        cart.products.forEach((cartProduct) => {
            if (cartProduct.productId === productId) {
                cartProduct.quantity = cartProduct.quantity + 1;
                console.log(cartProduct.quantity);
                return;
            };
        });
    } catch (error) {
        alert(error.message);
        console.log(error);
    };
};

//Remove product from cart
const removeProduct = async function(cartId, productId) {
    try {
        const cart = await getCart(cartId);
        const filteredProducts = cart.products.filter(function (cartProduct) {
            const isFound = (cartProduct.productId !== productId);
            return isFound;
        });
        cart.products = filteredProducts;
        console.log(cart);
    } catch (error) {
        window.alert(error.message);
        console.log(error);
    };
};


//Get a single cart from server and display it on the user interface
async function getSingleCartAndDisplay() {
    try {
        const cartDetails = JSON.parse(window.localStorage.getItem("cartDetails"));
        const cart = await getCart(cartDetails.id);
        const cartElem = document.createElement("div");
        cartElem.classList.add("cart");
        cartElem.innerHTML = `
            <p class="cartId">Cart Id: ${cart.id}</p>
            <p class="cartOwner">Owner Id: ${cart.userId}</p>
            <p class="cartCreationDate">Creation Date: ${cart.date}</p>
        `;

        const productsContainerElem = document.createElement("div");
        productsContainerElem.classList.add("productsContainer");

        cartContainerElem.append(cartElem);
        cartContainerElem.append(productsContainerElem);
        
        cart.products.forEach(async (cartProduct) => {
            const response = await fetch(`https://fakestoreapi.com/products/${cartProduct.productId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product from server");
            } else {
                const product = await response.json();
                const productElem = document.createElement("div");
                productElem.classList.add("product");
                productElem.innerHTML = `
                    <h4 class="productId">Product Id: ${product.id}</h4>
                    <p class="productTitle">${product.title}</p>
                    <img class="productImage" src=${product.image}>
                    <p class="productPrice">$${product.price}</p>
                    <p class="productQuantity">Quantity: ${cartProduct.quantity}</p>
                    <!-- We can use this section to add features such as remove product from cart, quantity decrement and increment -->
                    <div class="productButtons">
                        <button class="productDecreaseButton" onClick="decreaseQuantity(${cart.id}, ${product.id})">-</button>
                        <button class="productRemoveButton" onClick="removeProduct(${cart.id}, ${product.id})">Remove</button>
                        <button class="productIncreaseButton" onClick="increaseQuantity(${cart.id}, ${product.id})">+</button>
                    </div>
                `;
                productsContainerElem.append(productElem);
            };
        });

    

        //Display page heading
        pageHeadingElem.textContent = "My Cart";
    } catch (error) {
        window.alert(error.message);
        console.error();
    };
};

getSingleCartAndDisplay();

