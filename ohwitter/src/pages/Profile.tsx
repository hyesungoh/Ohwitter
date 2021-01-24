import React, { useEffect, useState } from "react";
import { authService, dbService } from "FBase";
import { useHistory } from "react-router-dom";

interface ProfileInterface {
    userObj: firebase.default.User | null;
}

const Profile = ({ userObj }: ProfileInterface) => {
    const [newName, setNewName] = useState<any>(userObj?.displayName);
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

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        setNewName(value);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (userObj?.displayName !== newName) {
            await userObj?.updateProfile({
                displayName: newName,
            });
        }
    };

    return (
        <>
            <button onClick={onClickSignOut}>Sign Out</button>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="new name"
                    value={newName}
                    onChange={onChange}
                />
                <input type="submit" value="submit" />
            </form>
        </>
    );
};

export default Profile;
