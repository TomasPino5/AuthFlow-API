import express from "express"
import dotenv from "dotenv"
dotenv.config({ override: true });

const app = express()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(process.env.PORT, () => {
    console.log(`Server listen on http://localhost:${process.env.PORT}`);
})