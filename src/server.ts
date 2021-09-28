require("dotenv").config();
// récupérer les chemins alias une fois le projet déployé
if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}
import express, { Application } from "express";
import helmet from "helmet";
import http from "http";
import cors from "cors";
import morgan from "morgan";

// cache
declare global {
  var myCache: NodeCache;
}
import NodeCache from "node-cache";
import router from "./routes";
import nodemailer from "nodemailer";

import smtpTransport from "nodemailer-smtp-transport";

global.myCache = new NodeCache();

const app: Application = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(require("express-status-monitor")());
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
