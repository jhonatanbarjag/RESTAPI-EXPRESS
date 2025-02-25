import pg from 'pg';
const {Client} = pg;

import config from '../services/conexion.js';



export async function ConsultarUsers() {
    const cliente = new Client(config);
    try {
        await cliente.connect();
        const res = await cliente.query('SELECT * FROM users');
        return res.rows;     
    }catch (error) {
        console.error(error);
    }
}

export async function ConsultarUser(id) {
    const cliente = new Client(config);
    try {
        await cliente.connect();
        const res = await cliente.query('SELECT * FROM users WHERE id = $1', [id]);

        if (res.rows.length === 0) {
            return {message: "No se encontro el usuario"};
        }
        return res.rows;    
    }catch (error) {
        console.error(error);
    }
}

export async function CreateUser(data) {
    const cliente = new Client(config);
    try {
        // Intenta conectar al cliente de PostgreSQL usando la configuración proporcionada
        await cliente.connect();

        // Ejecuta una consulta SQL para insertar un nuevo usuario en la tabla 'users'
        // Los valores de 'name' y 'email' se pasan como parámetros para evitar inyecciones SQL
        const { rows } = await cliente.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [data.name, data.email]);

        // Devuelve la primera fila del resultado de la consulta, que contiene el usuario recién creado
        return rows[0];
    } catch (error) {
        // Si ocurre un error durante la conexión o la consulta, se captura aquí
        console.error(error);

        // Lanza el error para que pueda ser manejado por el bloque 'catch' en la ruta correspondiente
        throw error;
    } finally {
        // Este bloque se ejecuta siempre, independientemente de si hubo un error o no
        // Cierra la conexión del cliente para liberar recursos
        await cliente.end();
    }
}

export async function DeleteUser(id) {
    const cliente = new Client(config);
    try {
        await cliente.connect();
        const {rows,rowCount}= await cliente.query('DELETE FROM users WHERE id = $1 RETURNING *' , [id]);
        
        if (rowCount === 0) {
            return {message: "No se encontro el usuario"};
        }
        return rows[0];
    }catch (error) {
        console.error(error);
    }
}

export async function UpdateUser(id, data) {
    const cliente = new Client(config);
    try {
        await cliente.connect();
        const {rows}= await cliente.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *' , [data.name, data.email, id]);
        
        // rows es un arreglo de objetos para que muestre el dato actualizado
        return rows[0];
    }catch (error) {
        console.error(error);
    }
}