import pg from 'pg';
const {Client} = pg;

const config = {
    user: 'restapi_a1zq_user',
    password: 'EW4jHxAmxQLP9qcAXY5Xie8ZlM7u8CjU',
    host: 'dpg-cuuf68in91rc738h8jd0-a.oregon-postgres.render.com',
    database: 'restapi_a1zq',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
};

//validar conexion
export async function Conectar(){
    const cliente = new Client(config);
    try {
        await cliente.connect();
        console.log("Conectado a la base de datos");
        
    } catch (error) {
        console.log("Error al conectar a la base de datos", error);
        
    }

}

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
        await cliente.connect();
        const {rows} = await cliente.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [data.name, data.email]);
        return rows[0];
    }catch (error) {
        console.error(error);
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
