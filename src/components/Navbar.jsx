import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <header className="app-navbar">
            <div className="app-navbar__brand">
                <span className="app-navbar__logo" aria-hidden="true">{"\u{1F4AC}"}</span>
            </div>
            <div className="app-navbar__user-group">
                <span className="app-navbar__greeting">
                    Hola, <strong>{user?.username || "Invitado"}</strong>
                </span>
                <button type="button" className="btn btn--ghost" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;

