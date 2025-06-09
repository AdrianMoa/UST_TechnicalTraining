import { NavLink } from "react-router";
import { useAuth } from "../auth/useAuth";

export const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <header className="sticky mini-header">
            <nav className="nav-left">
                <span className="page-icon">
                    <img src="/assets/logo-3.svg" alt="logo" width="40" height="70" />
                </span>
                <NavLink to="/" className="button rounded">
                    Home
                </NavLink>
                {isAuthenticated && (
                    <>
                        <NavLink to="/projects" className="button rounded">
                            Projects
                        </NavLink>
                        <NavLink to="/project" className="button rounded">
                            New Project
                        </NavLink>
                    </>
                )}
            </nav>
            <nav className="nav-right">
                {!isAuthenticated ? (
                    <>
                        <NavLink to="/login" className="button rounded">
                            Login
                        </NavLink>
                        <NavLink to='/register' className='button rounded'>
                            Register
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to='/profile' className='button rounded'>
                            Welcome, {user?.username}
                        </NavLink>
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </nav>
        </header>
    );
};