
export const inputUserValidations = (registerUser, registerUserSpan) => {
    if (registerUser.value.length > 12) {
        registerUserSpan.innerText = "El nombre de usuario debe tener 12 caracteres como maximo"
        registerUserSpan.style.color = 'red'
        return false;
    } else if (registerUser.value && registerUser.value.length < 6) {
        registerUserSpan.innerText = "El nombre de usuario debe tener 6 caracteres como minimo"
        registerUserSpan.style.color = 'red'
        return false;
    } else if (!isNaN(Number(registerUser.value)) && registerUser.value.length > 3) {
        registerUserSpan.innerText = "El nombre de usuario debe tener una letra como minimo"
        registerUserSpan.style.color = 'red'
        return false;
    } else if (!/^[a-z0-9]+$/.test(registerUser.value) && registerUser.value.length > 0) {
        registerUserSpan.innerText = "El nombre de usuario solo puede contener letras y números, sin espacios, caracteres especiales y/o mayusculas";
        registerUserSpan.style.color = 'red';
        return false;
    } else {
        registerUserSpan.innerText = ""
        return true
    }
}

export const inputPassValidations = (registerUser, registerPass, registerPassSpan) => {
    if (registerPass.value.length > 16) {
        registerPassSpan.innerText = "La contraseña debe tener 16 caracteres como maximo"
        registerPassSpan.style.color = 'red'
        return false;
    } else if (registerPass.value && registerPass.value.length < 8) {
        registerPassSpan.innerText = "La contraseña debe tener 8 caracteres como minimo"
        registerPassSpan.style.color = 'red'
        return false;
    } else if (registerPass.value && (registerPass.value == registerUser.value)) {
        registerPassSpan.innerText = "La contraseña debe ser distinta al nombre de usuario"
        registerPassSpan.style.color = 'red'
        return false;
    } else if (!/^(?=.*[A-Z]|.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).+$/.test(registerPass.value) && registerPass.value) {
        registerPassSpan.innerText = "La contraseña debe tener almenos un caracter especial o una mayuscula";
        registerPassSpan.style.color = 'red';
        return false;
    } else {
        registerPassSpan.innerText = ""
        return true;
    }
}

export const inputConfirmPassValidations = (registerUser, registerPass, confirmPass, confirmPassSpan) => {
    if (confirmPass.value.length > 16) {
        confirmPassSpan.innerText = "La contraseña debe tener 16 caracteres como maximo"
        confirmPassSpan.style.color = 'red'
        return false;
    } else if (confirmPass.value.length < 8 && confirmPass.value) {
        confirmPassSpan.innerText = "La contraseña debe tener 8 caracteres como minimo"
        confirmPassSpan.style.color = 'red'
        return false;
    } else if (confirmPass.value && (confirmPass.value == registerUser.value)) {
        confirmPassSpan.innerText = "La contraseña debe ser distinta al nombre de usuario"
        confirmPassSpan.style.color = 'red'
        return false;
    } else if (!/^(?=.*[A-Z]|.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).+$/.test(confirmPass.value) && confirmPass.value) {
        confirmPassSpan.innerText = "La contraseña debe tener almenos un caracter especial o una mayuscula";
        confirmPassSpan.style.color = 'red';
        return false;
    } else if ((registerPass.value && confirmPass.value) && (registerPass.value !== confirmPass.value)) {
        confirmPassSpan.innerText = "Las contraseñas no coinciden"
        confirmPassSpan.style.color = 'red'
        return false;
    } else {
        confirmPassSpan.innerText = ""
        return true;
    }
}