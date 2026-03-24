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

const productEditButtonElem = document.getElementById("productEditButton");
const productEditStatusElem = document.getElementById("productEditStatus");
const productEditPrefillingElem = document.getElementById("productEditPrefilling");

//Make API request to get the particular product we intend to edit on clicking "Edit Product" link
//This is an IIFE (Immediately Invoked Function Expression): Function that runs as soon as it is defined
(async function () {
    //Extract the id of the product we intend to edit from the current URL address
    const foundUrlQueryParams = new URLSearchParams(window.location.search);
    const productId = foundUrlQueryParams.get("id");

    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    //Alternative to !response.ok
    if (response.ok === false) {
        productEditPrefillingElem.textContent = "Failed to fetch previous data on the form, but you can still edit the form manually";
        productEditPrefillingElem.style.color = "#FF0000";
        return;
    }
    const product = await response.json();
    
    //Prefill the form with the product's last saved data
    productTitleElem.value = product.title;
    productCategoryElem.value = product.category;
    productDescriptionElem.value = product.description;
    productPriceElem.value = product.price;
    productIdElem.value = product.id;
    productImageElem.value = product.image;
})();


//Make API request to edit product upon clicking "Update" button
productEditButtonElem.addEventListener("click", async function (Event) {
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

    //De-activate "Update" button to avoid multiple-clicking on the button
    productEditButtonElem.disabled = true;
    productEditButtonElem.textContent = "Updating";
    productEditButtonElem.style.backgroundColor = "#454545"; //Light black

    //Extract the id of the product we intend to edit from the current URL address
    const foundUrlQueryParams = new URLSearchParams(window.location.search);
    const productId = foundUrlQueryParams.get("id");

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            productEditStatusElem.textContent = "Product update failed";
            productEditStatusElem.style.color = "#FF0000";
            window.location.reload();
            return;
        }
    } catch(error) {
        console.log(error);
    }

    productEditStatusElem.textContent = "Product updated successfully";
    productEditStatusElem.style.color = "#08a308";
    window.location.href = "my-products.html";

    //Restore back "Update" button
    productEditButtonElem.disabled = false;
    productEditButtonElem.textContent = "Update";
    productEditButtonElem.style.backgroundColor = "rgb(0,0,0)"; //Black
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
