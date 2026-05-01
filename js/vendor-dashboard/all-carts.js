//Element Pointers
const pageHeadingElem = document.getElementById("pageHeading");
const cartsContainerElem = document.getElementById("cartsContainer");

//Update cart product
const updateCartProduct = async (cartId, productId)=> {
    try {
        const user = JSON.parse( window.localStorage.getItem("user") );

        //Get cart using its id and update clicked product
        const getCartResponse = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
        if (getCartResponse.ok !== true) {
            throw new Error("Failed to get cart");
        };
        const fetchedCart = await getCartResponse.json();
        const productToUpdate = fetchedCart.products.find((cartProduct)=> {
            return (cartProduct.productId === productId );
        });
        productToUpdate.id = 2;
        

        //Pass updated cart to server via "body" field 
        const cart = { userId: user.id, products: [{id: productToUpdate.productId}] };
        //const cart = { userId: 1, products: [{ id: 2 }] };
        const updateCartResponse = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        });
        if (!updateCartResponse.ok) {
            throw new Error("Failed to update cart product");
        };
        const updatedCart = await updateCartResponse.json();
        console.log(updatedCart.products[0].id);
        //window.location.reload();
    } catch(error) {
        alert(error.message);
        console.error();
    };
};

//Delete cart using its id
const deleteCart = async function (cartId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error("Cart deletion failed");
        } else {
            const deletedCart = await response.json();
            console.log(deletedCart);
        };
    } catch(error) {
        window.alert(error.message);
        console.log(error);
    };
};

//Get all carts from server
async function getAllCarts() {
    const response = await fetch('https://fakestoreapi.com/carts');
    if (!response.ok) {
        throw new Error("Failed to get all carts");
    } else {
        const carts = await response.json();
        return carts;
    }
};

//Get all carts and display them on the user interface
async function getAndDisplayCarts() {
    try {
        const carts = await getAllCarts();
        for (let index = 0; index < carts.length; index++) {
            const cart = carts[index];
            const cartCreationDate = cart.date;
            const cartId = cart.id;
            const cartOwner = cart.userId;
            const cartElem = document.createElement("div");
            cartElem.classList.add("cart");
            cartElem.innerHTML = `
                <p class="cartId">Cart Id: ${cartId}<p>
                <p class="cartOwner">Owner Id: ${cartOwner}</p> 
                <p class="cartCreationDate">Creation Date: ${cartCreationDate}</p>
                <button class="cartDeleteButton" onClick=deleteCart(${cart.id})>Delete</button>
                <!-- <button onClick="updateCartProduct(${cart.id})">Update</button> -->
            `;

            const productsContainerElem = window.document.createElement("div");
            productsContainerElem.classList.add("productsContainer");

            cartsContainerElem.append(cartElem);
            cartElem.append(productsContainerElem);

            cart.products.forEach(async (cartProduct) => {
                const productElem = document.createElement("div");
                productElem.classList.add("product");
                const response = await fetch(`https://fakestoreapi.com/products/${cartProduct.productId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product from server"); 
                } else {
                    const product = await response.json();
                    productElem.innerHTML = `
                        <!-- <h2>Products</h2> -->
                        <h3 class="productId">Product Id: ${product.id}</h3>
                        <p class="productTitle">${product.title}</p>
                        <img class="productImage" src=${product.image}>
                        <p class="productPrice">$${product.price}</p>
                        <p class="productQuantity">Quantity: ${cartProduct.quantity}</p>
                    `;
                    productsContainerElem.append(productElem);
                };
                
            });

        };

        //Display page heading
        pageHeadingElem.textContent = "All Carts";
    } catch(error) {
        window.alert(error.message);
        console.log(error);
    };
};

getAndDisplayCarts();
