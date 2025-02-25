import { Router } from "express";
import { ConsultarUsers } from '../services/conexion.js';
import { ConsultarUser } from '../services/conexion.js';
import { DeleteUser } from "../services/conexion.js";
import { CreateUser } from "../services/conexion.js";


const router = Router();

//router.get("/users", async (req, res) => {
//    const {rows} = await cliente.query("SELECT * FROM users");
//    res.json(rows);
//})
router.get('/users', async (req, res) => {
    const users = await ConsultarUsers();
    res.status(200).json(users);
});

router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const users = await ConsultarUser(id);
    res.status(200).json(users);
})
router.post("/users", async (req, res) => {
    const data = req.body;
    const users = await CreateUser(data);
    res.status(200).json(users);
    

})
router.delete("/user/:id", async(req, res) => {
    const { id } = req.params;
    const users = await DeleteUser(id);
    res.status(200).json(users);
})
router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    res.send("editando usuario" + id);
})

export default router;