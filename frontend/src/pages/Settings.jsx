import { useState, useEffect } from "react";
import MainLayout from "../components/Layout/MainLayout";
import { FaUser, FaLock, FaSave, FaCog } from "react-icons/fa";

import {
    getProfile,
    changePassword
} from "../services/authService";

import "../styles/settings.css";

function Settings() {

    const [profile, setProfile] = useState({
        username: "",
        email: ""
    });

    const [password, setPassword] = useState({
        current: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [preferences, setPreferences] = useState({
        interval: 60,
        timeout: 10,
        autoRefresh: true
    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data = await getProfile();

            setProfile({
                username: data.username,
                email: data.email
            });

        } catch (err) {

            console.log(err);

        }

    };

    const handleProfileChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const handlePasswordChange = (e) => {

        setPassword({

            ...password,

            [e.target.name]: e.target.value

        });

    };

    const handlePreferenceChange = (e) => {

        const { name, value, type, checked } = e.target;

        setPreferences({

            ...preferences,

            [name]: type === "checkbox"
                ? checked
                : value

        });

    };

    const saveProfile = () => {

        alert("Profile update feature coming soon.");

    };

    const handleChangePassword = async () => {

        if (
            !password.current ||
            !password.newPassword ||
            !password.confirmPassword
        ) {

            alert("Please fill all fields.");

            return;

        }

        if (
            password.newPassword !==
            password.confirmPassword
        ) {

            alert("Passwords do not match.");

            return;

        }

        try {

            const response = await changePassword(

                password.current,

                password.newPassword

            );

            alert(response.message);

            setPassword({

                current: "",

                newPassword: "",

                confirmPassword: ""

            });

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Password update failed."

            );

        }

    };

    const savePreferences = () => {

        alert("Preferences saved.");

    };

    return (

        <MainLayout>

            <div className="settings-page">

                <h1>Settings</h1>

                <p>

                    Manage your account and monitoring preferences.

                </p>

                {/* Profile */}

                <div className="settings-card">

                    <h2>

                        <FaUser />

                        Profile

                    </h2>

                    <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleProfileChange}
                    />

                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                    />

                    <button
                        className="save-btn"
                        onClick={saveProfile}
                    >

                        <FaSave />

                        Save Profile

                    </button>

                </div>

                {/* Password */}

                <div className="settings-card">

                    <h2>

                        <FaLock />

                        Change Password

                    </h2>

                    <input
                        type="password"
                        name="current"
                        placeholder="Current Password"
                        value={password.current}
                        onChange={handlePasswordChange}
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={password.newPassword}
                        onChange={handlePasswordChange}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={password.confirmPassword}
                        onChange={handlePasswordChange}
                    />

                    <button
                        className="save-btn"
                        onClick={handleChangePassword}
                    >

                        <FaLock />

                        Change Password

                    </button>

                </div>

                {/* Preferences */}

                <div className="settings-card">

                    <h2>

                        <FaCog />

                        Monitoring Preferences

                    </h2>

                    <label>

                        Default Check Interval

                    </label>

                    <input
                        type="number"
                        name="interval"
                        value={preferences.interval}
                        onChange={handlePreferenceChange}
                    />

                    <label>

                        Request Timeout

                    </label>

                    <input
                        type="number"
                        name="timeout"
                        value={preferences.timeout}
                        onChange={handlePreferenceChange}
                    />

                    <div className="checkbox">

                        <input
                            type="checkbox"
                            name="autoRefresh"
                            checked={preferences.autoRefresh}
                            onChange={handlePreferenceChange}
                        />

                        <span>

                            Auto Refresh Dashboard

                        </span>

                    </div>

                    <button
                        className="save-btn"
                        onClick={savePreferences}
                    >

                        <FaSave />

                        Save Preferences

                    </button>

                </div>

            </div>

        </MainLayout>

    );

}

export default Settings;