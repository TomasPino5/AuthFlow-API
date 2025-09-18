import express from "express"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { UserRepository } from "./db-controller.js"
import { tokenVerify } from './token-verify.js'
import dotenv from "dotenv"
dotenv.config({ override: true });

const app = express()

app.set('view engine', 'ejs') // Le dice a express que las vistas se van a reenderizar utilizando ejs

//middlewares
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
    const { user } = req.session
    res.render('index', user) 
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const id = await UserRepository.create({ username, password })
        const user = {id: id, username}
        tokenVerify(res, user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserRepository.login({ username, password })
        tokenVerify(res, user)
    } catch (error) {
        res.status(400).json({ message: 'Ocurrio un error al loguearse' })
    }
})


app.listen(process.env.PORT, () => {
    console.log(`Server listen on http://localhost:${process.env.PORT}`);
})
