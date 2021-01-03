import React, { useState } from "react";
import firebase from "firebase/app";
import { authService, firebaseInstance } from "FBase";

const Auth = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [newAccount, setNewAccount] = useState<boolean>(true);
    const [error, setError] = useState<string>("");


    const onChange = (event: Event | any) => {
        const {
            target: { name, value },
        } = event;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event: Event | any) => {
        event.preventDefault();

        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleSign = () => setNewAccount((prev) => !prev);

    const onClickSocial = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const { name } = event.target as HTMLButtonElement;
        
        let provider: any;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Sign Up" : "Sign In"}
                />
            </form>
            <span>{error}</span>
            <span onClick={toggleSign}>
                change to {newAccount ? "Sign In" : "Sign Up"}
            </span>
            <div>
                <button onClick={onClickSocial} name="google">
                    Continue with Goggle
                </button>
                <button onClick={onClickSocial} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;
