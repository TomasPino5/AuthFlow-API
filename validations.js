export class Validations {
    static username(username) {
        if(typeof username !== "string") throw new Error("El usuario debe ser de tipo texto");
        if(username.length <= 3) throw new Error("Debe tener 4 caracteres como minimo");
    }
}