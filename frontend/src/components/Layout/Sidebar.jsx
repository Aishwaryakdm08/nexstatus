import { NavLink, useNavigate } from "react-router-dom";

import {
    FaChartLine,
    FaServer,
    FaExclamationTriangle,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <aside className="sidebar">

            <div>

                <nav className="sidebar-menu">

                    <NavLink to="/dashboard" className="menu-item">
                        <FaChartLine className="menu-icon"/>
                        Dashboard
                    </NavLink>

                    <NavLink to="/apis" className="menu-item">
                        <FaServer className="menu-icon"/>
                        API Management
                    </NavLink>

                    <NavLink to="/incidents" className="menu-item">
                        <FaExclamationTriangle className="menu-icon"/>
                        Incidents
                    </NavLink>

                    <NavLink to="/settings" className="menu-item">
                        <FaCog className="menu-icon"/>
                        Settings
                    </NavLink>

                </nav>

            </div>

            <button
                className="logout-btn"
                onClick={logout}
            >

                <FaSignOutAlt />

                Logout

            </button>

        </aside>

    );

}

export default Sidebar;