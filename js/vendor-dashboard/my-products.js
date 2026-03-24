const productsContainerElem = document.getElementById("productsContainer");

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
        } catch(error) {
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

        //Get the length (size) of the products array
        const productsLength = products.length;

        //Loop through the products array and display each product on the User Interface (UI)
       for (let index = 0; index < productsLength; index++) {
            const product = products[index];

            const productElem = document.createElement("div");
            productElem.classList.add("containerItem");
            //Remember to include the id of the product on the link's href and the button's onclick attribute.
            //This enables us to access the particular product we intend to edit or delete in the  edit page and the delete function respectively.
            productElem.innerHTML = `
                <img class="itemImage" Src=${product.image}>
                <h3 class="itemTitle">${product.title}</h3>
                <p class="itemDesc">${product.description}</p>
                <h2 class="itemPrice">${product.price}</h2>
                <div>
                    <a class="itemEditLink" href=edit-product.html?id=${product.id}>Edit Product</a>
                    <button class="itemDeleteButton" onclick="deleteProduct(${product.id})">Delete Product</button>
                </div>
            `;
        
            productsContainerElem.appendChild(productElem);
        }

    } catch(error) {
        console.log(error);
    }
    
};

getAndDisplayProducts();
