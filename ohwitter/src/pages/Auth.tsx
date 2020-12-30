import React, { useState } from "react";
import { authService } from "FBase";

const Auth = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [newAccount, setNewAccount] = useState<boolean>(true);

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
            console.log(error);
        }
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

            <div>
                <button>Continue with Goggle</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;
