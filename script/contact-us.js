

document.querySelector("form button").addEventListener("click", submitData);

function submitData(event) {
    event.preventDefault();
    let fullNameInput = document.querySelector(".full-name input");
    let emailInput = document.querySelector(".email input");
    let passwordInput = document.querySelector(".password input");
    let confirmPassword = document.querySelector(".confirm-password input");

    let valid = true;
    let fullNameInputValidation = /^[a-zA-Z]{2}.{1,}/;

    if (fullNameInputValidation.test(fullNameInput.value)) {
        document.querySelector(`.full-name p`).style.cssText = "display:none;";
    } else {
        showError("name must start with 2 characters, at least 3 in length", ".full-name");
        valid = false;
    }

    let emailInputValidation = /^[a-zA-Z]{4}[a-zA-z0-9]{0,}\@(gmail|yahoo)\.com$/;

    if (emailInputValidation.test(emailInput.value)) {
        document.querySelector(`.email p`).style.cssText = "display:none;";
    } else {
        showError("email must start with at least 4 characters followed by @ gmail or yahoo .com", ".email");
        valid = false;
    }

    let passwordInputValidation = /^.{4,}/;
    if (passwordInputValidation.test(passwordInput.value)) {
        document.querySelector(`.password p`).style.cssText = "display:none;";
    } else {
        showError("password length must be at least 4", ".password");
        valid = false;
    }

    if (confirmPassword.value == passwordInput.value) {
        document.querySelector(`.confirm-password p`).style.cssText = "display:none;";
    } else {
        showError("password not identical", ".confirm-password");
        valid = false;
    }

    if (valid == true) {
        alert("submitted successfully");
    } 
}
function showError(message, element){
    let errorP = document.querySelector(`${element} p`);
    errorP.innerText = message;
    errorP.style.cssText ="display:block;"
}