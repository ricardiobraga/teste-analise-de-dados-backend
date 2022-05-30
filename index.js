import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


import router from './routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const port = process.env.PORT ||3003;

app.use(cors());
app.use(bodyParser.json());
app.use(router);




app.listen(port, () => {
    console.log(`Backend rodando na porta ${process.env.PORT}`);
})