import passport from 'passport';
import { Strategy } from 'passport-local';
import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';

import { config } from '../config/config';

// Class
import ClsExpR from '../class/ClsExpR';
import ClsUsuario from '../modules/users/class/ClsUsuario';

// Interfaces
import { IValidacion } from '../interface/IValidacion';
import { IUsuario } from '../modules/users/interface/IUsuario';

//LOGIN
passport.use('local.signin', new Strategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const validacion = VerificarDatosLogin(req.body);
        if (!validacion.validacion) return done(validacion.mensaje, false, { message: validacion.mensaje });
        const { mensaje, vali, Usuario } = await ClsUsuario.VerificarLogin(email, password);
        if (!vali) return done(mensaje, false, { message: mensaje });
        done(null, Usuario);
    } catch (error:any) {
        console.log(error);
        return done(error, false, { message: "Ocurrió un error" });
    }
}));

//REGISTER
passport.use('local.signup', new Strategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, username, password, done) => {
    try {
        const validacion = VerificarDatosRegister(req.body);
        if (!validacion.validacion) return done(validacion.mensaje, false, { message: validacion.mensaje });
        // const { username, password } = req.body;
        const newUsuario = await ClsUsuario.registrarPersona(username, password);
        return done(null, newUsuario);
    } catch (error: any) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") return done("Ese usuario ya está en uso", false, { message: "Ese usuario ya está en uso" });
        return done("Ocurrió un error", false, { message: "Ocurrió un error" });
    }
}));

//Passport con JWT
passport.use('jwt', new StrategyJWT({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}, async (payload, done) => {
    try {
        return done(null, payload);
    } catch (error) {
        console.log(error);
        return done(error, payload);
    }
}));


const VerificarDatosLogin = (cuerpo: any): IValidacion => {
    const { username } = cuerpo;
    const { mensaje, validacion } = ClsExpR.validarNombre(username);
    if (!validacion) return { mensaje, validacion };
    return { mensaje: "Validado", validacion: true };
}
const VerificarDatosRegister = (cuerpo: any): IValidacion => {
    const { username, password, repeatPassword } = cuerpo;
    if (password !== repeatPassword) return { mensaje: "Las contraseñas no coinciden", validacion: false };
    const { mensaje, validacion } = ClsExpR.validarNombre(username);
    if (!validacion) return { mensaje, validacion };
    return { mensaje: "Validado", validacion: true };
}