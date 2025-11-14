import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

function PrivateData() {
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const acessarRotaPrivada = async () => {
        setErro("");
        setDados(null);
        setCarregando(true);

        const token = sessionStorage.getItem("jwtToken");

        if (!token) {
            setErro("Token não encontrado. Faça login primeiro.");
            setCarregando(false);
            return;
        }

        try {
            const resposta = await axios.get(`${API_URL}/private`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDados(resposta.data);
        } catch (err) {
            const status = err.response?.status;

            if (status === 401) setErro("Token ausente.");
            else if (status === 403) {
                setErro("Token inválido ou expirado.");
                sessionStorage.removeItem("jwtToken");
            } else {
                setErro("Erro ao acessar a rota privada.");
            }

            setDados(null);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="card">
            <h2>Rota Privada</h2>
            <button onClick={acessarRotaPrivada} disabled={carregando}>
                {carregando ? "Carregando..." : "Acessar /private"}
            </button>

            {erro && <p className="error">{erro}</p>}

            {dados && <pre>{JSON.stringify(dados, null, 2)}</pre>}
        </div>
    );
}

export default PrivateData;
