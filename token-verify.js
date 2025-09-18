import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const tokenVerify = (res, user) => {
    const token = jwt.sign(
        { id: user.id, username: user.username }, //payload: texto legible en texto plano por eso no se agrega la contraseña
        process.env.SECRET_TOKEN, //firma
        { expiresIn: '1h' } //opcional, tiempo de expiracion del token
    )

    res.cookie('access_token', token, {
        httpOnly: true, //solo podremos acceder a la cookie desde el servidor
        sameSite: 'strict', //la cookie solo se puede acceder en el mismo dominio
        maxAge: 1000 * 60 * 60, //solo tiene validez de una hora
    }).send({ user })
    
}