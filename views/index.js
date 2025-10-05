import { inputUserValidations, inputPassValidations, inputConfirmPassValidations } from "./validations.js"

const $ = el => document.querySelector(el)
const loginForm = $('#login-form')
const loginSpan = $('#login-form span')
const registerForm = $('#register-form')
const registerUserSpan = $('#register-username-span')
const registerPassSpan = $('#register-password-span')
const confirmPassSpan = $('#register-confirmPassword-span')
const logoutButton = $('#close-session')
const registerPass = $('#register-password')
const confirmPass = $('#resgister-confirm-password')
const registerUser = $('#register-username')

//validaciones de input
const arr = [registerUser, registerPass, confirmPass]
arr.forEach(element => {
    element?.addEventListener("input", () => {
        inputUserValidations(registerUser, registerUserSpan)
        inputPassValidations(registerUser, registerPass, registerPassSpan)
        inputConfirmPassValidations(registerUser, registerPass, confirmPass, confirmPassSpan)
    })
});

//validaciones de submit
loginForm?.addEventListener('submit', e => {
    e.preventDefault()
    const username = $('#login-username').value
    const password = $('#login-password').value

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(async res => {
            if (res.ok) {
                loginSpan.innerText = 'Sesion Iniciada... Entrando...'
                loginSpan.style.color = 'green'
                setTimeout(() => {
                    window.location.href = '/protected'
                }, 1200)
            } else {
                const errorData = await res.json()
                loginSpan.innerText = errorData.message || 'Error al iniciar sesion'
                loginSpan.style.color = 'red'
            }
        })
})

registerForm?.addEventListener('submit', e => {
    e.preventDefault()
    const username = $('#register-username').value
    const password = $('#register-password').value
    const confirmPassword = $('#resgister-confirm-password').value
    if (password !== confirmPassword) {
        confirmPassSpan.innerText = "Las contraseñas no coinciden"
        confirmPassSpan.style.color = "red"
        return
    }
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(async res => {
            if (res.ok) {
                confirmPassSpan.innerText = 'Usuario Registrado. Entrando...'
                confirmPassSpan.style.color = 'green'
                setTimeout(() => {
                    fetch('/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, password })
                    })
                        .then(async res => {
                            if (res.ok) {
                                window.location.href = '/protected'
                            } else {
                                const errorData = await res.json()
                                loginSpan.innerText = errorData.message || 'Error al iniciar sesion'
                                loginSpan.style.color = 'red'
                            }
                        })
                }, 1200)
            } else {
                if (registerUserSpan == '' || registerPassSpan == '' || confirmPassSpan == '') {
                    const errorData = await res.json()
                    confirmPassSpan.innerText = errorData.message || 'Error al registrar usuario'
                    confirmPassSpan.style.color = 'red'
                }
            }
        })
})
logoutButton?.addEventListener('click', () => {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                window.location.href = ('/')
            }
        })
})

