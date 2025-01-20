import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import router from './router'
import {connectDB} from './config/db'
import { corsConfig } from './config/cors'

//Conexion con DB
connectDB();

const app = express()

//Cors
app.use(cors(corsConfig));

//Lectura datos de formularios
app.use(express.json());

app.use('/', router);

export default app