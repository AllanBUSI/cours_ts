
import {Request, Response} from 'express';
import { connection } from 'src/database';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { selectEmail } from 'src/database/sql';
require("dotenv").config();


interface IRegister {
    email: string;
    password: string;
    passwordConfirm: string;
}

export const RegisterController = async (req: Request, res:Response) => {
    const body = req.body as IRegister;
    // connection sql
    connection.query({
        sql: selectEmail,
        values: [body.email]
    }, async function (error, results, fields) {
        // error return error 
        if(error) {
            return res.status(500).json({
                error: true,
                message: "error server"
            })
        }
        // error result > 0
        if(results.length !== 0) {
            return res.status(500).json({
                error: false,
                message: "l'utilisateur existe déjà"
            })
        }
        // crée du hash
        const hash = await bcrypt.hash(body.password, 10);
        // connection sql
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
            // utilsateur créer
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
    // connection sql
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
        // l'email est invalide car la longeur du tableau est vide
        if(results.length === 0) {
            return res.status(409).json({
                error: false,
                message: "Couple courriel/mot de passe incorrect ",            
            })
        }
        // on verify le mot de passe
        const goodPassword = await bcrypt.compare(body.password, results[0].password);
        // si le mot de passe est incorrecte error
        if (!goodPassword) {            
            return res.status(409).json({
                error: true,
                message: "Couple courriel/mot de passe incorrect",
            });
        }
        // création token
        var token = jwt.sign({ foo: 'bar' }, process.env.SECRET);

        return res.status(200).json({
            error: true,
            message: "Connecter",
            token: token
        });
    })
}
