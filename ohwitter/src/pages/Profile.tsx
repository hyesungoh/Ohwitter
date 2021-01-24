import React, { useEffect } from "react";
import { authService, dbService } from "FBase";
import { useHistory } from "react-router-dom";

interface ProfileInterface {
    userObj: firebase.default.User | null;
}

const Profile = ({ userObj }: ProfileInterface) => {
    const history = useHistory();

    const onClickSignOut = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyOhweets = async () => {
        const ohweets = await dbService
            .collection("ohweets")
            .where("writer", "==", userObj?.uid)
            .orderBy("createdAt")
            .get();
        console.log(ohweets.docs);
    };  

    useEffect(() => {
        getMyOhweets();
    }, []);

    return (
        <>
            <button onClick={onClickSignOut}>Sign Out</button>
        </>
    );
};

export default Profile;
