import express from 'express';
import { PORT } from './src/config.js';
import router from './src/routes/routes.js';
import { Conectar } from './src/services/conexion.js';


const app = express(); 

app.use(express.json());

app.use(router);




app.listen(PORT);
console.log("SERVER ON PORT", PORT);

//Conectar a la base de datos
Conectar();