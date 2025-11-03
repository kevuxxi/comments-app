import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginRequest, registerRequest } from "../features/auth/authSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(loginRequest({ username, password }));
    };

    const handleRegister = (event) => {
        event.preventDefault();
        dispatch(registerRequest({ username, password }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (token) {
            navigate("/comments");
        }
    }, [token, navigate]);

    const toggleMode = () => {
        setIsRegisterMode((prev) => !prev);
    };

    return (
        <div>
            <h2>{isRegisterMode ? "Registrarse" : "Iniciar sesión"}</h2>

            {loading && <p>Cargando...</p>}

            <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading
                        ? isRegisterMode
                            ? "Registrando..."
                            : "Ingresando..."
                        : isRegisterMode
                            ? "Registrarse"
                            : "Login"}
                </button>
            </form>

            <button onClick={toggleMode} style={{ marginTop: "10px" }}>
                {isRegisterMode
                    ? "¿Ya tienes cuenta? Inicia sesión"
                    : "¿No tienes cuenta? Regístrate"}
            </button>
        </div>
    );
};

export default LoginPage;
