//Element pointers
const pageHeadingElem = document.getElementById("pageHeading")
const allCartsButtonElem = document.getElementById("allCartsButton");
const productsContainerElem = document.getElementById("productsContainer");
const searchFormElem = document.getElementById("searchForm");
const searchInputElem = document.getElementById("searchInput");
const searchValidationElem = document.getElementById("searchValidation");
let modifiedProducts = [];

//Validate search field to prevent users from submitting empty search input
searchFormElem.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchInput = searchInputElem.value;
    if (searchInput.length === 0) {
        searchInputElem.style.borderColor = "rgb(255,0,0)";
        searchValidationElem.classList.add("searchValidation")
        searchValidationElem.textContent = "Search field cannot be empty";
        return;
    };
});

//Move to all carts page when checkouts (carts) button is clicked
allCartsButtonElem.addEventListener("click", (event) => {
    window.location.href = "all-carts.html";
    return;
});


//Search for product
searchInputElem.addEventListener("input", function (event) {
    event.preventDefault();

    const searchInput = searchInputElem.value.trim().toLowerCase();
    const filteredProducts = modifiedProducts.filter((modifiedProduct) => {
        return ((modifiedProduct.title.indexOf(searchInput) !== -1) || (modifiedProduct.description.indexOf(searchInput) !== -1))
    });

    //Clear products container, remove "View All Carts" button, and change page heading indicating search result 
    //if the product searched is not found 
    if (filteredProducts.length === 0) {
        productsContainerElem.innerHTML = "";
        allCartsButtonElem.remove();
        pageHeadingElem.textContent = "Product not found";
        return;
    }

    //Clear products container, remove "View All Carts" button, change page heading indicating search result, 
    //and display products found on the user interface
    productsContainerElem.innerHTML = "";
    allCartsButtonElem.remove();
    pageHeadingElem.textContent = "Search Result";

    filteredProducts.forEach((filteredProduct) => {
        const productElem = document.createElement("div");
        productElem.classList.add("containerItem");
        productElem.innerHTML = `
            <img class="itemImage" src=${filteredProduct.image}>
            <h3 class="itemTitle">${filteredProduct.title}</h3>
            <p class="itemDesc">${filteredProduct.description}</p>
            <h2 class="itemPrice">${filteredProduct.price}</h2>
            <a class="itemLink" href="../product.html?id=${filteredProduct.id}">Product Details</a>
            <div class="itemEditAndDeleteContainer">
                <a class="itemEditLink" href=edit-product.html?id=${filteredProduct.id}>Edit Product</a>
                <button class="itemDeleteButton" onclick="deleteProduct(${filteredProduct.id})">Delete Product</button>
            </div>
        `;
        productsContainerElem.appendChild(productElem);
    });
});



//Make API request to delete the particular product on clicking "Delete Product" button 
async function deleteProduct(productId) {
    const deleteConfirmation = confirm("Are you sure you want to delete this product ?");

    //The codes in comment below do thesame thing:
    //"https://fakestoreapi.com/products/" + productId = String Concatenation
    //`https://fakestoreapi.com/products/${productId}` = STring Interpolation
    if (deleteConfirmation) {
        try {
            const response = await fetch("https://fakestoreapi.com/products/" + productId, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Product successfully deleted");
                window.location.reload();
            } else {
                alert("Error occurred, try deleting the product again");
            }
        } catch (error) {
            window.alert(error.message);
            console.error();
        };
    };
};

async function getAndDisplayProducts() {
    try {
        //Make API request to get ALL products
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            console.error("Ooh no, Could not fetch a response");
            return;
        }
        const products = await response.json();

        modifiedProducts = products.map((product) => {
            product.title = product.title.toLowerCase();
            product.description = product.description.toLowerCase();
            return product;
        });

        //Get the length (size) of the products array
        const modifiedProductsLength = modifiedProducts.length;

        //Loop through the products array and display each product on the User Interface (UI)
        for (let index = 0; index < modifiedProductsLength; index++) {
            const modifiedProduct = modifiedProducts[index];

            const productElem = document.createElement("div");
            productElem.classList.add("containerItem");
            //Remember to include the id of the product on the link's href and the button's onclick attribute.
            //This enables us to access the particular product we intend to edit or delete in the  edit page and the delete function respectively.
            productElem.innerHTML = `
                <img class="itemImage" src="${modifiedProduct.image}">
                <h3 class="itemTitle">${modifiedProduct.title}</h3>
                <p class="itemDesc">${modifiedProduct.description}</p>
                <h2 class="itemPrice">$${modifiedProduct.price}</h2>
                <a class="itemLink" href="../product.html?id=${modifiedProduct.id}">Product Details</a>
                <div class="itemEditAndDeleteContainer">
                    <a class="itemEditLink" href=edit-product.html?id=${modifiedProduct.id}>Edit Product</a>
                    <button class="itemDeleteButton" onclick="deleteProduct(${modifiedProduct.id})">Delete Product</button>
                </div>
            `;

            productsContainerElem.appendChild(productElem);
        }

    //Display page heading and the "View All Carts" (for all carts) button
    pageHeadingElem.textContent = "My Products"
    allCartsButtonElem.textContent = "View All Carts";
    } catch (error) {
        window.alert(error.message);
        console.log(error);
    }

};

getAndDisplayProducts();
