import express from "express"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
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
        return res.status(401).json({ error: "Token inválido o expirado" })
    }
})

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(process.env.PORT, () => {
    console.log(`Server listen on http://localhost:${process.env.PORT}`);
})