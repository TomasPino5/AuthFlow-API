import express from "express"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { UserRepository } from "./db-controller.js"
import { Validations } from "./validations.js"
import { accessTokenController, refreshTokenController } from './token-controller.js'
import dotenv from "dotenv"
dotenv.config({ override: true });

const app = express()

//middlewares
app.set('view engine', 'ejs') // Le dice a express que las vistas se van a reenderizar utilizando ejs
app.use(express.static("views"));
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    try {
        const data = jwt.verify(token, process.env.SECRET_TOKEN) //verificamos que el token que nos llega sea igual al secreto
        req.session.user = data
    } catch (error) {
        req.session.user = null
    }
    next()
})

//rutas
app.get("/", (req, res) => {
    res.redirect("/login")
})

app.get("/login", (req, res) => {
    const { user } = req.session
    res.render('index', user)
})

app.get("/register", (req, res) => {
    const { user } = req.session
    res.render('register', user)
})

app.get("/protected", (req, res) => {
    const { user } = req.session;
    try {
        Validations.portectedValidations(user);
        res.render("protected", user)
    } catch (error) {
        res.status(400).json({ error: "Lo sentimos, no se pudo acceder a la pagina" })
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const id = await UserRepository.create({ username, password })
        const user = { id: id, username }
        accessTokenController(res, user)
        refreshTokenController(res, user)
        res.send({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserRepository.login({ username, password })
        accessTokenController(res, user)
        refreshTokenController(res, user)
        res.send({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    const { user } = req.session;
    
    try {
        Validations.refreshValidations(refreshToken, user);
        const data = jwt.verify(refreshToken, process.env.SECRET_TOKEN)
        accessTokenController(res, data)
        res.send({ message: "Token refrescado" })
    } catch (error) {
        res.status(403).json({ error: "Refresh token inválido o expirado" })
    }
})

app.post("/logout", (req, res) => {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    res.send({ message: "Se cerro la sesion correctamente" })
})


app.listen(process.env.PORT, () => {
    console.log(`Server listen on http://localhost:${process.env.PORT}`);
})
