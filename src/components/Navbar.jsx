import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(logout())
        navigate("/login");
    }
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <div>
            <h1>Hola, {user?.username || 'Invitado'}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar