import dbLocal from 'db-local'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config({ override: true })

const { Schema } = new dbLocal({ path: './db' })

export const User = Schema('User', {
    id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
})

export class UserRepository {
    static create ({ username, password}) {
        const id = crypto.randomUUID()
        const hashedPass = bcrypt.hashSync(password, process.env.SALT_NUMBER)

        User.create({
            id: id,
            username,
            password: hashedPass
        }).save()
        return id;
    }

    static login ({ username, password }) {}
}