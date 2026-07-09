import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields.");
            return;
        }

        try {

            setLoading(true);

            const data = await loginUser(
                email,
                password
            );
            console.log(data);

            localStorage.setItem(
                "token",
                data.token
            );

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout
            title="Welcome Back"
            subtitle="Login to your NexStatus account"
        >

            <form onSubmit={handleLogin}>

                <input
                    className="auth-input"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="auth-button"
                    type="submit"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

            <div className="auth-link">

                Don't have an account?

                {" "}

                <Link to="/register">
                    Register
                </Link>

            </div>

        </AuthLayout>

    );

}

export default Login;