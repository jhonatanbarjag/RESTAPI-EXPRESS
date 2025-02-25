import { Router } from "express";
import { ConsultarUsers } from '../services/conexion.js';
import { ConsultarUser } from '../services/conexion.js';

const router = Router();

//router.get("/users", async (req, res) => {
//    const {rows} = await cliente.query("SELECT * FROM users");
//    res.json(rows);
//})
router.get('/users', async (req, res) => {
    const users = await ConsultarUsers();
    res.status(200).json(users);
});

router.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const users = await ConsultarUser(id);
    res.status(200).json(users);
})
router.post("/user", (req, res) => {
    res.send("creando usuario");    
})
router.delete("/user/:id", (req, res) => {
    res.send("eliminando usuario");
})
router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    res.send("editando usuario" + id);
})

export default router;