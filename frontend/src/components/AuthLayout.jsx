import "../styles/auth.css";
import logo from "../assets/NSlogo.png";

function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="auth-container">

            <div className="auth-card">

                <img
                    src={logo}
                    alt="NexStatus Logo"
                    className="logo"
                />

                <h1>{title}</h1>

                <p>{subtitle}</p>

                {children}

            </div>

        </div>
    );
}

export default AuthLayout;