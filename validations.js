import bcrypt from 'bcrypt'
import { User } from './db-controller.js'

export class Validations {
    static async createValidations(username, password) {
        if(!isNaN(Number(username))) throw new Error("El nombre de usuario debe tener una letra como minimo");
        if(username.length <= 3) throw new Error("El nombre de usuario debe tener 4 caracteres como minimo");
        if(username.length > 12) throw new Error("El nombre de usuario debe tener 12 caracteres como maximo");
        if(username == password) throw new Error("El nombre de usuario debe ser distinto a la contraseña");

        const user = await User.findOne({ username })
        if (user) throw new Error('El usuario ya existe')

        if(typeof password !== "string") throw new Error("La contraseña debe tener una letra como minimo");
        if(password.length <= 3) throw new Error("La contraseña debe tener 4 caracteres como minimo");
        if(password.length > 12) throw new Error("La contraseña debe tener 12 caracteres como maximo");
    }

    static async loginValidations(username, password) {
        const user = await User.findOne({ username })
        if (!user) throw new Error("Usuario o contraseña incorrectos");
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new Error("Usuario o contraseña incorrectos");

        return user
    }

    static refreshValidations(refreshToken, user) {
        if(!refreshToken) throw new Error("No se pudo refrescar el token")
        if(!user) throw new Error("No se encuentra logueado")
    }

    static portectedValidations(user) {
        if(!user) throw new Error("No tiene acceso a esta pagina")
    }
}