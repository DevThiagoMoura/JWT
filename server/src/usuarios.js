import bcrypt from "bcryptjs";

const senhaHash = bcrypt.hashSync("123456", 10);

export const usuarios = [
    {
        id: 1,
        nome: "Admin",
        email: "admin@example.com",
        senha: senhaHash
    }
];
