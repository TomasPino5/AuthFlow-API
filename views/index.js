import { inputValidations } from "./validations.js"

const $ = el => document.querySelector(el)
const loginForm = $('#login-form')
const loginSpan = $('#login-form span')
const registerForm = $('#register-form')
const registerSpan = $('#register-form span')
const logoutButton = $('#close-session')
const registerPass = $('#register-password')
const confirmPass = $('#resgister-confirm-password')
const registerUser = $('#register-username')

//validaciones de input
const arr = [registerUser, registerPass, confirmPass]
arr.forEach(element => {
    element?.addEventListener("input", () => {
        inputValidations(registerUser, registerPass, confirmPass, registerSpan)
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
    if (password != confirmPassword) {
        registerSpan.innerText = "Las contraseñas no coinciden"
        registerSpan.style.color = "red"
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
                registerSpan.innerText = 'Usuario Registrado. Entrando...'
                registerSpan.style.color = 'green'
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
                const errorData = await res.json()
                registerSpan.innerText = errorData.message || 'Error al registrar usuario'
                registerSpan.style.color = 'red'
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