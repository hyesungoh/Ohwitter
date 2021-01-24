import React from "react";
import { Link } from "react-router-dom";

interface NavigationInterface {
    userObj: firebase.default.User | null;
}

const Navigation = ({ userObj }: NavigationInterface) => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{userObj?.displayName}'s Profile</Link>
            </li>
        </ul>
    </nav>
);

export default Navigation;
