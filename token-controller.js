import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const accessTokenController = (res, user) => {
    const accessToken = jwt.sign(
        { id: user.id, username: user.username }, //payload: texto legible en texto plano por eso no se agrega la contraseña
        process.env.SECRET_TOKEN, //firma
        { expiresIn: '15m' } //tiempo de expiracion del token
    )

    res.cookie('access_token', accessToken, {
        httpOnly: true, //solo podremos acceder a la cookie desde el servidor
        sameSite: 'strict', //la cookie solo se puede acceder en el mismo dominio
        maxAge: 1000 * 60 * 15, //solo tiene validez de 15 minutos
    })
}

export const refreshTokenController = (res, user) => {
    const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.SECRET_TOKEN,
        { expiresIn: "7d" }
    )
    
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true, //solo podremos acceder a la cookie desde el servidor
        sameSite: 'strict', //la cookie solo se puede acceder en el mismo dominio
        maxAge: 1000 * 60 * 60 * 24 * 7, //tiene validez de 7 dias
    })
}