import React from "react";
import { authService } from "FBase";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();

    const onClickSignOut = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
            <button onClick={onClickSignOut}>Sign Out</button>
        </>
    );
};

export default Profile;
