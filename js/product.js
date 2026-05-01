const productHeadingElem = document.getElementById("productHeading");
const productElem = document.getElementById("product");

const urlQueryParams = new URLSearchParams(window.location.search);
const productId = urlQueryParams.get("id");

(async function() {
    if ( !(productId && (productId > 0) && (productId <= 20)) ) {
        alert("Please enter a valid product id");
        return;
    }
    
    try { 
        const response = await fetch("https://fakestoreapi.com/products/" + productId);
        if (!response.ok) {
            window.alert("Cannot fetch product at the moment, try again");
            return;
        }
        const product = await response.json();

        productHeadingElem.textContent = product.title;
        
        productElem.innerHTML = `
            <img class="productImage" src=${product.image}>
            <h3 class="productTitle">${product.title}</h3>
            <p class="productDescription">${product.description}</p>
            <h2 class="productPrice">$${product.price}</h2>
        `;
    } catch(error) {
        window.alert("Error occurred: " + error.message);
        return;
    };
})();
