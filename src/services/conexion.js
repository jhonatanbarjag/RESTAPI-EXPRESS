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
        return res.rows;    
    }catch (error) {
        console.error(error);
    }
}

