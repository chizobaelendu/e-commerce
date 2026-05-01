//Element pointers
const fullName = document.getElementById("regFullname");
const email = document.getElementById("regEmail");
const phoneNumber = document.getElementById("regPhoneNumber");
const password = document.getElementById("regPassword");
//const busName = document.getElementById("regBusinessName");
const button = document.getElementById("submitButton");
const fullNameValidationError = document.getElementById("fullNameValidationError");
const emailValidationError = document.getElementById("emailValidationError");
const phoneNumberValidationError = document.getElementById("phoneNumValidationError");
const passwordValidationError = document.getElementById("passwordValidationError");
//const busNameValidationError = document.getElementById("busNameValidationError");
const regStatusElem = document.getElementById("registrationStatus");

//Input Error Validation and registration API request
button.addEventListener("click", async function(Event) {
    //Prevent browser from reloading
    Event.preventDefault();

    //Input body submitted on clicking "submit" button
    const inputBody = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        phoneNumber: phoneNumber.value.trim(),
        password: password.value.trim(),
        //busName: busName.value.trim(),
    };

    //Dynamic input error validation logic for fullname
    if(inputBody.fullName.length === 0) {
        fullNameValidationError.classList.add("fullname-validation-error");
        fullNameValidationError.textContent = "Please enter your fullname";
        fullName.style.borderColor = "rgb(248, 8, 8)";
        return;
        //return console.log("NO INPUT");
    }

    //Dynamic input error validation logic for email
    if(inputBody.email.length === 0) {
        emailValidationError.classList.add("email-validation-error");
        emailValidationError.textContent = "Please enter your email address";
        email.style.borderColor = "rgb(248, 8, 8)";
        return;
        //return console.log("NO INPUT");
    }

    //Dynamic input error validation logic for phone number
    if(inputBody.phoneNumber.length === 0) {
        phoneNumberValidationError.classList.add("phoneNumber-validation-error");
        phoneNumberValidationError.textContent = "Please enter your phone number";
        phoneNumber.style.borderColor = "rgb(248, 8, 8)";
        return;
        //return console.log("NO INPUT");
    }

    //Dynamic input error validation logic for password
    if(inputBody.password.length === 0) {
        passwordValidationError.classList.add("password-validation-error");
        passwordValidationError.textContent = "Please enter your password";
        password.style.borderColor = "rgb(248, 8, 8)";
        return;
        //return console.log("NO INPUT");
    }

    /*
    Dynamic input error validation logic for business name
    if(inputBody.busName.length === 0) {
        busNameValidationError.classList.add("busName-validation-error");
        busNameValidationError.textContent = "Please enter your business name";
        busName.style.borderColor = "rgb(248, 8, 8)";
        return;
        //return console.log("NO INPUT");
    }
    */

    //De-activate registration button to avoid multiple-clicking on the button
    button.disabled = true;
    button.textContent = "Processing...";
    button.style.backgroundColor = "#454545"; //Light black

    //API request for user registration
    try {
        const response = await fetch("https://igronchain.onrender.com/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputBody)
        });

        //User registration status logic. 
        //"response.ok" property checks for HTTP related errors e.g., 500 Internal Server Error or 404 Not Found
        if(response.ok) {
            regStatusElem.textContent = "Registration successful, you can now login";
            regStatusElem.style.color = "#08a308";
        } else {
            regStatusElem.textContent = "Ohh no, Registration failed";
            regStatusElem.style.color = "#FF0000";
            return;
        }

        const responseData = await response.json();

        //Retrieve and store user's access token and details in the browser local storage 
        const accessToken = responseData.data.accessToken;
        const user = responseData.data.user;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userDetails", JSON.stringify(user));
    
    } catch(error) {
        //Note that fetch() promise only rejects when NETWORK related error occur e.g., no internet connection
        //and such error is handled by catch() method
        regStatusElem.textContent = error.message;
        regStatusElem.style.color = "#FF0000";
    } finally {
        //Restore back registration button
        button.disabled = false;
        button.textContent = "Register";
        button.style.backgroundColor = "rgb(0,0,0)"; //black
    }

    //Redirect to vendor dashboard
    window.location.href = "login.html";
});

//Input Success Validation
//For fullname
fullName.addEventListener("input", (Event)=> {
    Event.preventDefault();
    fullNameValidationError.classList.remove("fullname-validation-error");
    fullNameValidationError.textContent = "";
    fullName.style.borderColor = "";
});

//For email
email.addEventListener("input", (Event)=> {
    Event.preventDefault();
    emailValidationError.classList.remove("email-validation-error");
    emailValidationError.textContent = "";
    email.style.borderColor = "";
});

//For Phone number
phoneNumber.addEventListener("input", (Event)=> {
    Event.preventDefault();
    phoneNumberValidationError.classList.remove("phoneNumber-validation-error");
    phoneNumberValidationError.textContent = "";
    phoneNumber.style.borderColor = "";
});

//For password
password.addEventListener("input", (Event)=> {
    Event.preventDefault();
    passwordValidationError.classList.remove("password-validation-error");
    passwordValidationError.textContent = "";
    password.style.borderColor = "";
});

/*
For business name
busName.addEventListener("input", (Event)=> {
    Event.preventDefault();
    busNameValidationError.classList.remove("busName-validation-error");
    busNameValidationError.textContent = "";
    busName.style.borderColor = "";
});
*/
