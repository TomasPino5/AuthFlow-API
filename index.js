import express from "express"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { UserRepository } from "./db-controller.js"
import { tokenVerify } from './token-verify.js'
import dotenv from "dotenv"
dotenv.config({ override: true });

const app = express()

app.set('view engine', 'ejs') // Le dice a express que las vistas se van a reenderizar utilizando ejs

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    try {
        const data = jwt.verify(token, process.env.SECRET_TOKEN) //comparamos el token que nos llega con el secreto
        req.session.user = data
        next()
    } catch (error) {
        req.session.user = null
        return res.status(401).json({ error: 'token invalido' })
    }
})

app.get("/", (req, res) => {
    const { user } = req.session
    res.render('index', user) 
})

app.post("/login", (req, res) => {
    const { username, password } = req.body
    try {
        
    } catch (error) {
        
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const id = await UserRepository.create({ username, password })
        const user = {id: id, username}
        tokenVerify(res, user)
        res.send('Se ha creado el usuario correctamente')
    } catch (error) {
        res.status(400).send('Ocurrio un error al registrarse')
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server listen on http://localhost:${process.env.PORT}`);
})
