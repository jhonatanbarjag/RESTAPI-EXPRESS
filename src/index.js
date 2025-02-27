import express from 'express';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';

import { PORT } from '../src/config.js';
import router from './routes/routes.js';

import { Conectar } from './services/conexion.js';
import morgan from 'morgan';


const app = express(); //crear un servidor
app.use(morgan('dev')); //middleware para ver las peticiones en consola

app.use(express.json()); //middleware para recibir datos en formato json


//configurar el motor de plantillas
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname, 'views'));     //donde estan las vistas
app.set('view engine', 'ejs');  //motor de plantillas

app.use(router);
app.use(express.static(join(__dirname, 'public')));




app.listen(PORT);
console.log("SERVER ON PORT", PORT);

//Conectar a la base de datos
Conectar();