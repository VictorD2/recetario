import { NextFunction, Request, Response } from "express";
import boom from '@hapi/boom';

//Libs
import { signToken } from '../../../lib/jwt';
import passport from 'passport';

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("local.signin", { session: false }, (err, user, info) => {
      if (err) return res.json({ error: err });
      if (!user) return res.json({ error: "Contraseña o Correo inválidos" });
      delete user.password;
      const token = signToken(user, process.env.JWT_SECRET + "");
      return res.json({ success: "Sesión Iniciada", user, token });
    })(req, res, next);
  } catch (error: any) {
    console.log(error);
    return res.json(boom.internal(`Algo sucedió mal, inténtelo más tarde: ${error.message}`));
  }
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("local.signup", { session: false }, (err, user, info) => {
      if (err) return res.json(boom.badRequest(err));
      if (!user) return res.json(boom.badData());
      delete user.password;
      const token = signToken(user, process.env.JWT_SECRET + "");
      return res.json({ success: "Sesión Iniciada", user, token });
    })(req, res, next);
  } catch (error: any) {
    console.log(error);
    return res.json(boom.internal(`Algo sucedió mal, inténtelo más tarde: ${error.message}`));
  }
}

export const publico = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const publicoPayLoad = { rango: "Publico" };
    const token = signToken(publicoPayLoad, process.env.JWT_SECRET + "");
    return res.json({ success: "Sesión Iniciada", token, user: { rango: "Publico" } });
  } catch (error: any) {
    console.log(error);
    return res.json(boom.internal(`Algo mal sucedió, intentelo más tarde: ${error.message}`));
  }
}

export const whoAmI = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    return res.json({ success: "Sesión Iniciada", user });
  } catch (error: any) {
    console.log(error);
    return res.json(boom.internal(`Algo mal sucedió, intentelo más tarde: ${error.message}`));
  }
}