/*
const logoutButtonElem = document.getElementById("logoutButton");

const accessToken = localStorage.getItem("accessToken");

//Allow user to log out if logged in, else redirect him to the login page if not logged in.
if(accessToken) {
    //A user is said to be logged out from a website when he/she looses access to the access token provided by the website. 
    logoutButtonElem.addEventListener("click", (event)=> {
        event.preventDefault();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userDetails");

        window.location.href = "../login.html";
    });
} else {
    window.location.href = "../login.html";
};
*/

//Element Pointers
const productTitleElem = document.getElementById("productTitle");
const productCategoryElem = document.getElementById("productCategory");
const productDescriptionElem = document.getElementById("productDescription");
const productPriceElem = document.getElementById("productPrice");
const productIdElem = document.getElementById("productId");
const productImageElem = document.getElementById("productImage");

const productTitleValidationElem = document.getElementById("productTitleValidation");
const productCategoryValidationElem = document.getElementById("productCategoryValidation");
const productDescriptionValidationElem = document.getElementById("productDescriptionValidation");
const productPriceValidationElem = document.getElementById("productPriceValidation");
const productIdValidationElem = document.getElementById("productIdValidation");
const productImageValidationElem = document.getElementById("productImageValidation");

const productAdditionButtonElem = document.getElementById("productAdditionButton");
const productAdditionStatusElem = document.getElementById("productAdditionStatus");

//Make API request to add product upon clicking "add" button
productAdditionButtonElem.addEventListener("click", async function (Event) {
    Event.preventDefault();

    const product = {
        title: productTitleElem.value.trim(),
        category: productCategoryElem.value.trim(),
        description: productDescriptionElem.value.trim(),
        price: productPriceElem.value.trim(),
        id: productIdElem.value.trim(),
        image: productImageElem.value.trim(),
    }

    if (product.title.length === 0) {
        productTitleElem.style.borderColor = "rgb(248, 8, 8)";
        productTitleValidationElem.textContent = "Enter product title";
        productTitleValidationElem.classList.add("productTitleValidation");
        return;
    }

    if (product.category.length === 0) {
        productCategoryElem.style.borderColor = "rgb(248, 8, 8)";
        productCategoryValidationElem.textContent = "Enter product category";
        productCategoryValidationElem.classList.add("productCategoryValidation");
        return;
    }

    if (product.description.length === 0) {
        productDescriptionElem.style.borderColor = "rgb(248, 8, 8)";
        productDescriptionValidationElem.textContent = "Enter product description";
        productDescriptionValidationElem.classList.add("productDescriptionValidation");
        return;
    }

    if (product.price.length === 0) {
        productPriceElem.style.borderColor = "rgb(248, 8, 8)";
        productPriceValidationElem.textContent = "Enter product price";
        productPriceValidationElem.classList.add("productPriceValidation");
        return;
    }

    if (product.id.length === 0) {
        productIdElem.style.borderColor = "rgb(248, 8, 8)";
        productIdValidationElem.textContent = "Enter product id";
        productIdValidationElem.classList.add("productIdValidation");
        return;
    }

    if (product.image.length === 0) {
        productImageElem.style.borderColor = "rgb(248, 8, 8)";
        productImageValidationElem.textContent = "Enter product image URL";
        productImageValidationElem.classList.add("productImageValidation");
        return;
    }

    //De-activate "Add" button to avoid multiple-clicking on the button
    productAdditionButtonElem.disabled = true;
    productAdditionButtonElem.textContent = "Adding";
    productAdditionButtonElem.style.backgroundColor = "#454545"; //Light black

    try {
        const response = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            productAdditionStatusElem.textContent = "Product addition failed";
            productAdditionStatusElem.style.color = "#FF0000";
            window.location.reload();
            return;
        }
    } catch(error) {
        console.log(error);
    }

    productAdditionStatusElem.textContent = "Product added successfully";
    productAdditionStatusElem.style.color = "#08a308";
    window.location.href = "my-products.html";

    //Restore back "Add" button
    productAdditionButtonElem.disabled = false;
    productAdditionButtonElem.textContent = "Add";
    productAdditionButtonElem.style.backgroundColor = "rgb(0,0,0)"; //Black
});


//For product title
productTitleElem.addEventListener("input", (event)=> {
    event.preventDefault();

    productTitleElem.style.borderColor = "";
    productTitleValidationElem.textContent = "";
    productTitleValidationElem.classList.remove("productTitleValidation");
});

//For product category
productCategoryElem.addEventListener("input", (event)=> {
    event.preventDefault();

    productCategoryElem.style.borderColor = "";
    productCategoryValidationElem.textContent = "";
    productCategoryValidationElem.classList.remove("productCategoryValidation");
});

//For product description
productDescriptionElem.addEventListener("input", (event)=> {
    event.preventDefault();

    productDescriptionElem.style.borderColor = "";
    productDescriptionValidationElem.textContent = "";
    productDescriptionValidationElem.classList.remove("productDescriptionValidation");
});

//For product price
productPriceElem.addEventListener("input", (event)=> {
    event.preventDefault();

    productPriceElem.style.borderColor = "";
    productPriceValidationElem.textContent = "";
    productPriceValidationElem.classList.remove("productPriceValidation");
});

//For product ID
productIdElem.addEventListener("input", (event)=> {
    event.preventDefault();

    productIdElem.style.borderColor = "";
    productIdValidationElem.textContent = "";
    productIdValidationElem.classList.remove("productIdValidation");
});

//For product image
productImageElem.addEventListener("input", (event)=> {
    event.preventDefault();

    productImageElem.style.borderColor = "";
    productImageValidationElem.textContent = "";
    productImageValidationElem.classList.remove("productImageValidation");
});
