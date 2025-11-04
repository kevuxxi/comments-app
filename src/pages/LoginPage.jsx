import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginRequest, registerRequest } from "../features/auth/authSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state) => state.auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(loginRequest({ email, password }));
    };

    const handleRegister = (event) => {
        event.preventDefault();
        dispatch(registerRequest({ name, email, password }));
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
        <div className="page auth-page">
            <div className="auth-card">
                <h1 className="auth-card__title">
                    {isRegisterMode ? "Crea tu cuenta" : "Bienvenido"}
                </h1>
                <h2 className="auth-card__subtitle">
                    {isRegisterMode
                        ? "Regístrate"
                        : "Iniciar sesion"}
                </h2>

                <form
                    className="auth-form"
                    onSubmit={isRegisterMode ? handleRegister : handleLogin}
                >
                    <label className="auth-form__label" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        id="name"
                        className="auth-form__input"
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        required
                        disabled={!isRegisterMode}
                    />

                    <label className="auth-form__label" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        className="auth-form__input"
                        type="email"
                        placeholder="tucorreo@ejemplo.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        required
                    />

                    <label className="auth-form__label" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        className="auth-form__input"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete={isRegisterMode ? "new-password" : "current-password"}
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn--primary auth-form__submit"
                        disabled={loading}
                    >
                        {loading
                            ? isRegisterMode
                                ? "Registrando..."
                                : "Ingresando..."
                            : isRegisterMode
                                ? "Registrarse"
                                : "Iniciar sesion"}
                    </button>
                </form>

                <button className="btn btn--ghost auth-card__toggle" onClick={toggleMode}>
                    {isRegisterMode
                        ? "¿Ya tienes cuenta? Inicia sesión"
                        : "¿No tienes cuenta? Regístrate"}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
