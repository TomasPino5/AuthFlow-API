import dbLocal from 'db-local'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { Validations } from "./validations.js"
import dotenv from 'dotenv'
dotenv.config({ override: true })

const { Schema } = new dbLocal({ path: './db' })

export const User = Schema('User', {
    id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
})

export class UserRepository {
    static async create({ username, password }) {
        await Validations.createValidations(username, password)

        const id = crypto.randomUUID()
        const hashedPass = bcrypt.hashSync(password, Number(process.env.SALT_NUMBER))

        await User.create({
            id: id,
            username,
            password: hashedPass
        }).save()

        return id;
    }

    static async login({ username, password }) {
        const user = await Validations.loginValidations(username, password)

        const publicUser = { id: user.id, username: user.username }

        return publicUser
    }
}