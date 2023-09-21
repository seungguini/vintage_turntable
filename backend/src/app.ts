import express from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import session from "express-session"
import * as dotenv from 'dotenv';
import cors from 'cors';

import "./typings" // Defines the types for session store data. Workaround with this bug: https://github.com/expressjs/session/issues/799

dotenv.config(); // Should load .env file directly

import spotifyRoutes from "./routes/spotify";
import { getFrontendURL } from './utils';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan("combined", {
  skip: (req, res) => {

    const isTesting = process.env.TESTING || false;

    const url : string = req.url;
    const staticFiles = url.includes("/static/")
    return staticFiles || isTesting
  }
})); // Logger to listen to requests
app.use(express.static("static/react"));

app.get("/statusCheck", (req, res) => {
  res.send("OK")
});

// Enable sessions for spotify authorization routes. This must be 
// placed before the spotify routes
app.set('trust proxy', 1);
app.use(session({
  secret: "This is extra secret here",
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 60 * 60 * 1000 //In milliseconds, so this is one hour
  }
}));

app.use(cors({
  // 
  origin: (_, callback) => {

    const corsAllowUrl = getFrontendURL();
    const allowedUrls : Array<string> = [corsAllowUrl];
    callback(null, allowedUrls);
  },
  method: ['GET', 'PUT', 'POST'],
  credentials: true
}))

app.use('/api/spotify', spotifyRoutes)

export default app;