import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest, registerRequest } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state) => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false)


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginRequest({ username, password }))
    }

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerRequest({ username, password }))
    }

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    useEffect(() => {
        if (token) {
            navigate("/comments");
        }
    }, [token, navigate]);

    const changeRegister = () => {
        return setRegister(!register)
    }

    return (
        <div>
            <h2>{register ? 'Registrarse' : 'Iniciar Sesion'}</h2>


            {loading && <p>Cargando...</p>}


            <form onSubmit={register ? handleRegister : handleLogin}>
                <input
                    type="text"
                    placeholder='Usuario'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit' disabled={loading}>
                    {loading
                        ? register
                            ? "Registrando..."
                            : "Ingresando..."
                        : register
                            ? "Registrarse"
                            : "Login"}
                </button>
            </form>


            <button onClick={changeRegister} style={{ marginTop: "10px" }}>
                {register
                    ? "¿Ya tienes cuenta? Inicia sesión"
                    : "¿No tienes cuenta? Regístrate"}
            </button>

        </div >
    )
}

export default LoginPage
