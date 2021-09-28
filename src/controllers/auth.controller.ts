import {Request, Response} from 'express';
import { connection } from 'src/database';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
require("dotenv").config();

interface IRegister {
    email: string;
    password: string;
    passwordConfirm: string;
}

export const RegisterController = async (req: Request, res:Response) => {
    const body = req.body as IRegister;

    connection.query({
        sql: 'SELECT email FROM `user` WHERE `email` = ?',
        values: [body.email]
    }, async function (error, results, fields) {
        if(error) {
            return res.status(500).json({
                error: true,
                message: "error server"
            })
        }

        if(results.length !== 0) {
            return res.status(500).json({
                error: false,
                message: "l'utilisateur existe déjà"
            })
        }

        const hash = await bcrypt.hash(body.password, 10);

        connection.query({
            sql: "INSERT INTO user (email, password) VALUES (?,?)",
            values: [body.email, hash]
        }, function (error, results, fields) {
            if(error) {
                return res.status(500).json({
                    error: true,
                    message: "error server"
                })
            }

            return res.status(200).json({
                error: false,
                message: "l'utilisateur créer"
            })
        });
    
    })
}

interface ILogin {
    email: string;
    password: string;
}

export const LoginController = (req:Request, res: Response) => {
    const body = req.body as ILogin;
    connection.query({
        sql: 'SELECT email, password FROM `user` WHERE `email` = ?',
        values: [body.email]
    }, async function (error, results, fields) {
        if(error) {
            return res.status(500).json({
                error: true,
                message: "error server"
            })
        }
        
        if(results.length === 0) {
            return res.status(409).json({
                error: false,
                message: "Couple courriel/mot de passe incorrect ",            
            })
        }

        const goodPassword = await bcrypt.compare(body.password, results[0].password);

        if (!goodPassword) {            
            return res.status(409).json({
                error: true,
                message: "Couple courriel/mot de passe incorrect",
            });
        }

        var token = jwt.sign({ foo: 'bar' }, process.env.SECRET);

        return res.status(200).json({
            error: true,
            message: "Connecter",
            token: token
        });
    })
}
