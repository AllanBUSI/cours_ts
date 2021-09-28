// .env 
require("dotenv").config();
// récupérer les chemins alias une fois le projet déployé
// verif 
if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}
// express
import express, { Application } from "express";
// helmet 
import helmet from "helmet";
// http
import http from "http";
// cross origin
import cors from "cors";

// cache
declare global {
  var myCache: NodeCache;
}
import NodeCache from "node-cache";
import router from "./routes";
// pour envoyer des email
import nodemailer from "nodemailer";

import smtpTransport from "nodemailer-smtp-transport";
import {connection} from './database/'
global.myCache = new NodeCache();

const app: Application = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;

// middleware motiteur
app.use(require("express-status-monitor")());
// express cassic
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

// routes de l'api
app.use(router);



(async () => {
  // const mailer = new Mailer(null, null, null, null);
  try {
    httpServer.listen(PORT);
    console.log(`Serveur lancé sur le port ${PORT}`);

    
    connection.connect(err => {
      if (err) {
          console.error(`error connecting: ${err.stack}`);
          return;
      }
      console.log(`connected as id ${connection.threadId}`);
    });

    //CONNEXION NODEMAILER
    const isConnected = async function connect() {
      try {
        return await nodemailer.createTransport(smtpTransport({
          service: "gmail",
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: true,
          requireTLS: true,
          greetingTimeout: 5000,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        })).verify();
      } catch (error) {
        console.log("Erreur lors de la connexion Nodemailer : " + error);
        return false;
      } 
    }
    if (!isConnected) {
      throw new Error("Connexion avec Nodemailer impossible");
    }
    // CONNEXION BASE DE DONNEES
  } catch (error) {
  }
})();
