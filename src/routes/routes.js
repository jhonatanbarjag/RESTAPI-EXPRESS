import { Router } from "express";
import { ConsultarUsers , ConsultarUser, DeleteUser, CreateUser, UpdateUser } from '../controllers/user.controllers.js';
import { UniqueConstraintError } from'sequelize';

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
    try {
        const data = req.body;
        const user = await CreateUser(data);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return res.status(409).json({ message: "El correo ya está registrado" });
        }
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});

router.delete("/user/:id", async(req, res) => {
    const { id } = req.params;
    const users = await DeleteUser(id);
    res.status(200).json(users);
})
router.put("/user/:id",  async(req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    const users = await UpdateUser(id , data);
    res.status(200).json(users);
})

export default router;