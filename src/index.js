import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser'; 
import router from './routes';
import { errorHandler } from './middlewares'; 

dotenv.config(); 

const app = express(); 

const { PORT } = process.env;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.use(errorHandler);

const server = app.listen(PORT);


export default server;
