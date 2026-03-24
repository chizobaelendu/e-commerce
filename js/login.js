//Element pointers
const loginEmailElem = document.getElementById("loginEmail");
const loginPasswordElem = document.getElementById("loginPassword");
const loginButtonElem = document.getElementById("submitButton");
const emailValidationErrorElem = document.getElementById("emailValidationError");
const passwordValidationErrorElem = document.getElementById("passwordValidationError");
const loginStatusElem = document.getElementById("loginStatus");

//Input Error Validation and login API request
loginButtonElem.addEventListener("click", async (event)=> {
    //Prevent browser from reloading
    event.preventDefault();

    const inputBody = {
        email: loginEmailElem.value.trim(),
        password: loginPasswordElem.value.trim()
    };

    //Validate email input when the login button is clicked 
    if(inputBody.email.length === 0) {
        emailValidationErrorElem.textContent = "Please enter your email";
        emailValidationErrorElem.classList.add("email-validation-error");
        loginEmailElem.style.borderColor = "rgb(248, 8, 8)";
        return;
    };

    //Validate password input when the login button is clicked 
    if(inputBody.password.length === 0) {
        passwordValidationErrorElem.textContent = "Please enter your password";
        passwordValidationErrorElem.classList.add("password-validation-error");
        loginPasswordElem.style.borderColor = "rgb(248, 8, 8)";
        return;
    };

    //De-activate login button to avoid multiple-clicking on the button
    loginButtonElem.disabled = true;
    loginButtonElem.textContent = "Processing...";
    loginButtonElem.style.backgroundColor = "#454545"; //Light black

    //API request for user login
    try {
        const response = await fetch("https://igronchain.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputBody)
        });
        const responseData = await response.json();

        //Retrieve and store user's access token and details in the browser local storage 
        const accessToken = responseData.data.accessToken;
        const user = responseData.data.user;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userDetails", JSON.stringify(user));

        //User login status logic. 
        //"response.ok" property checks for HTTP related errors e.g., 500 Internal Server Error or 404 Not Found
        if(response.ok) {
            loginStatusElem.textContent = "Successfully logged in";
            loginStatusElem.style.color = "#08a308";
        } else {
            loginStatusElem.textContent = "Logging process failed";
            loginStatusElem.style.color = "#FF0000";
        }

    } catch (error) {
        //Note that fetch() promise only rejects when NETWORK related error occur e.g., no internet connection
        //and such error is handled by catch() method
        loginStatusElem.textContent = error.message;
        loginStatusElem.style.color = "#FF0000";
    }

    //Redirect to vendor dashboard
    window.location.href = "vendor-dashboard/my-products.html";

    //Restore back "Login" button
    loginButtonElem.disabled = false;
    loginButtonElem.textContent = "Login";
    loginButtonElem.style.backgroundColor = "rgb(0,0,0)"; //Black
});

//Input Success Validation
loginEmailElem.addEventListener("input", (event)=> {
    event.preventDefault();
    emailValidationErrorElem.textContent = "";
    emailValidationErrorElem.classList.remove("email-validation-error");
    loginEmailElem.style.borderColor = "";
});


loginPasswordElem.addEventListener("input", (event)=> {
    event.preventDefault();
    passwordValidationErrorElem.textContent = "";
    passwordValidationErrorElem.classList.remove("password-validation-error");
    loginPasswordElem.style.borderColor = "";
});

