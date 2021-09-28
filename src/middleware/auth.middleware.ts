import { isAlphaNumeric } from "@utils/index";
import { isExisted } from "@utils/index";
import {Request, Response, NextFunction} from "express";
import { isPassword, isEmail } from '../utils/index';

interface IRegisterInterfaces {
    email: string;
    password: string;
    passwordConfirm: string;
}

export const RegisterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as IRegisterInterfaces;

    if(isExisted(body.email) === false || isAlphaNumeric(body.email) === false || isEmail(body.email) === false && body.email.length >= 85)
        return res.status(400).json({
            error: true,
            code: "MA1",
            message: "votre email n'est pas correct"
        })
    
    if(isExisted(body.password) === false || isPassword(body.password) === false || body.password.length <= 10 || body.password.length >= 100)
        return res.status(400).json({
            error: true,
            code: "MA2",
            message: "votre mot de passe n'est pas correct"
        })
    
    if(body.password !== body.passwordConfirm)
        return res.status(400).json({
            error: true,
            code: "MA2",
            message: "votre mot de passe n'est pas correct"
        })
    
    return next();

}

interface ILogin {
    email: string;
    password: string;
}

export const LoginMiddleware = (req:Request, res:Response, next: NextFunction) => {
    const body = req.body as ILogin;
    if(isExisted(body.email) === false || isEmail(body.email) === false && body.email.length >= 85)
        return res.status(400).json({
            error: true,
            code: "MA1",
            message: "votre email n'est pas correct"
        })
    
    if(isExisted(body.password) === false || isPassword(body.password) === false || body.password.length <= 10 || body.password.length >= 100)
        return res.status(400).json({
            error: true,
            code: "MA2",
            message: "votre mot de passe n'est pas correct"
        })
    next()
}