import {
    FaBell,
    FaSearch,
    FaUserCircle
} from "react-icons/fa";

function Navbar() {

    return (

        <div className="navbar">

            <div className="navbar-left">

                <h2>NexStatus</h2>

            </div>

            <div className="navbar-center">

                <div className="search-box">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search APIs..."
                    />

                </div>

            </div>

            <div className="navbar-right">

                <div className="notification">

                    <FaBell />

                </div>

                <div className="user-info">

                    <FaUserCircle className="user-icon" />

                    <span>Welcome, Aishwarya 👋</span>

                </div>

            </div>

        </div>

    );

}

export default Navbar;