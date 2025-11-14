import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

import { usuarios } from "./usuarios.js";
import { autenticarToken } from "./authMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());

// LOGIN
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: "Senha incorreta" });

    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({ token });
});

// ROTA PRIVADA
app.get("/private", autenticarToken, (req, res) => {
    res.json({
        mensagem: "Acesso autorizado",
        usuario: req.user
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
