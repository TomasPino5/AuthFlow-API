import bcrypt from 'bcrypt'
import { User } from './db-controller.js'

export class Validations {
    static async createValidations(username, password) {
        if(!isNaN(Number(username))) throw new Error("El nombre de usuario debe tener una letra como minimo");
        if(username.length <= 6) throw new Error("El nombre de usuario debe tener 6 caracteres como minimo");
        if(username.length > 12) throw new Error("El nombre de usuario debe tener 12 caracteres como maximo");
        if(!/^[A-Za-z0-9]+$/.test(username)) throw new Error("El nombre de usuario solo puede contener letras y números, sin espacios ni caracteres especiales");
        
        const user = await User.findOne({ username })
        if (user) throw new Error('El usuario ya existe')
            
        if(username == password) throw new Error("La contraseña debe ser distinta al nombre de usuario");
        if(typeof password !== "string") throw new Error("La contraseña debe tener una letra como minimo");
        if(password.length <= 7) throw new Error("La contraseña debe tener 8 caracteres como minimo");
        if(!/^(?=.*[A-Z]|.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).+$/.test(password)) throw new Error("La contraseña debe tener almenos un caracter especial o una mayuscula");
        if(password.length > 16) throw new Error("La contraseña debe tener 16 caracteres como maximo");
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