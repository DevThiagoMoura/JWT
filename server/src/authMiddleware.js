import jwt from "jsonwebtoken";

export function autenticarToken(req, res, next) {
    const header = req.headers["authorization"];

    if (!header)
        return res.status(401).json({ erro: "Token não informado" });

    const token = header.split(" ")[1];

    if (!token)
        return res.status(401).json({ erro: "Token inválido" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ erro: "Token expirado ou inválido" });
    }
}

