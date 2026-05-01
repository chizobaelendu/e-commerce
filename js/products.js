//Element pointers
const pageHeadingElem = document.getElementById("pageHeading");
const singleCartButtonElem = document.getElementById("singleCartButton");
const productsContainerElem = document.getElementById("productsContainer");
const products = [];

//Get user from server and store it in the local storage
(async function () {
    try {
        //"user" is fetched from fakestoreapi because login API is not working 
        const response = await fetch(`https://fakestoreapi.com/users/${1}`);
        if(response.ok !== true) {
            throw new Error("Failed to fetch user from the server");
        } else {
            const user = await response.json();
            //Convert "user" object to JSON and store it in the browser local storage
            window.localStorage.setItem("user", JSON.stringify(user));
        };
    } catch(error) {
        window.alert(error.message);
        console.log(error);
    };
})();

//Move to single cart page when checkout (cart) button is clicked
singleCartButtonElem.addEventListener("click", (event)=> {
    window.location.href = "cart.html";
    return;
});

//Add the clicked product to cart
async function addProductToCartOnClick(productId) {
    try {
        //Retrieve "user" JSON from the browser local storage and re-convert back to JavaScript object
        const user = JSON.parse( window.localStorage.getItem("user") );
        const product = {id: productId};
        products.push(product);
        const cart = { userId: user.id, products: products };

        //const cart = { userId: user.id, products: [{ id: 1 }] };
        const response = await fetch('https://fakestoreapi.com/carts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        });
        if (!response.ok) {
            throw new Error("Failed to add product to cart");
        }
        const cartDetails = await response.json();
        //Cart id is explicitly changed from its default value (11) to 5 because fakestoreapi does not have cart id of 11
        cartDetails.id = 5; 
        window.localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
        return;
    } catch(error) {
        window.alert(error.message);
        console.log(error);
    };
};

//Get all products from server and display each of them on the user interface
(async function() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if(!response.ok) {
            throw new Error("Could not fetch products at the moment");
        }
        const products = await response.json();
        
        const productsLength = products.length;
        for (let index = 0; index < productsLength; index++) {
            const product = products[index];
            
            const containerItemElem = document.createElement("div");
            containerItemElem.classList.add("containerItem");
            containerItemElem.innerHTML = `
                <img class="itemImage" src=${product.image}>
                <h3 class="itemTitle">${product.title}</h3>
                <p class="itemDescription">${product.description}</p>
                <h2 class="itemPrice">${product.price}</h2>
                <div>
                    <a class="itemLink" href="product.html?id=${product.id}">Product Details</a>
                    <button class="itemCartButton" onClick=addProductToCartOnClick(${product.id})>Add To Cart</button>
                </div>
            `;
            productsContainerElem.appendChild(containerItemElem);
        };

        //Display page heading and the "View Cart" (for single cart) button
        pageHeadingElem.textContent = "All Products";
        singleCartButtonElem.textContent = "View Cart";
    } catch(error) {
        alert(error.message);
        console.log(error);
    };
})();


