export const inputValidations = (registerUser, registerPass, confirmPass, registerSpan) => {
    if (registerPass.value && confirmPass.value && registerPass.value !== confirmPass.value) {
        registerSpan.innerText = "Las contraseñas no coinciden"
        registerSpan.style.color = 'red'
        return false;
    } else if (registerPass.value.length > 12 || confirmPass.value.length > 12) {
        registerSpan.innerText = "La contraseña debe tener 12 caracteres como maximo"
        registerSpan.style.color = 'red'
        return false;
    } else if (registerPass.value == registerUser.value || confirmPass.value == registerUser.value) {
        registerSpan.innerText = "La contraseña debe ser distinta al nombre de usuario"
        registerSpan.style.color = 'red'
        return false;
    } else if (!isNaN(Number(registerUser.value)) && registerUser.value.length > 3) {
        registerSpan.innerText = "El nombre de usuario debe tener una letra como minimo"
        registerSpan.style.color = 'red'
        return false;
    } else if (registerUser.value.length > 12) {
        registerSpan.innerText = "El nombre de usuario debe tener 12 caracteres como maximo"
        registerSpan.style.color = 'red'
        return false;
    } else if (!/^[A-Za-z0-9]+$/.test(registerUser.value)) {
        registerSpan.innerText = "El nombre de usuario solo puede contener letras y números, sin espacios ni caracteres especiales";
        registerSpan.style.color = 'red';
        return false;
    } else {
        registerSpan.innerText = ""
        return true;
    }
}