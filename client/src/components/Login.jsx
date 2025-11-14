import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    const fazerLogin = async (e) => {
        e.preventDefault();
        setMensagem("");
        setCarregando(true);

        try {
            const resposta = await axios.post(`${API_URL}/login`, {
                email,
                senha,
            });

            const token = resposta.data.token;
            sessionStorage.setItem("jwtToken", token);

            setMensagem("Login realizado com sucesso!");
        } catch (erro) {
            const msg = erro.response?.data?.erro || "Erro ao realizar login.";
            setMensagem(`Erro: ${msg}`);
            sessionStorage.removeItem("jwtToken");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="card">
            <h2>Login</h2>
            <form onSubmit={fazerLogin}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <button type="submit" disabled={carregando}>
                    {carregando ? "Entrando..." : "Entrar"}
                </button>
            </form>

            {mensagem && (
                <p className={mensagem.startsWith("Erro") ? "error" : "success"}>
                    {mensagem}
                </p>
            )}
        </div>
    );
}

export default Login;
