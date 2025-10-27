import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest } from '../features/auth/authSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading, error, token } = useSelector((state) => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = () => {
        e.preventDefault();
        dispatch(loginRequest({ username, password }))
    }

    if (token) {
        navigate("/comments");
    }

    return (
        <div>
            <h2>Iniciar sesión</h2>

            {error && <p>{error}</p>}
            {loading && <p>Cargando...</p>}

            <form onSubmit={handleLogin} >
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
                <button disabled={loading}>
                    {loading ? "Ingresando..." : "Login"}
                </button>
            </form>


        </div>
    )
}

export default LoginPage