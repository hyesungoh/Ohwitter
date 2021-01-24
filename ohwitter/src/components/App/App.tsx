import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "FBase";

import "components/App/App.scss";

function App() {
    const [init, setInit] = useState<boolean>(false);
    const [userObj, setUserObj] = useState<firebase.default.User | null>(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user);
            }
            setInit(true);
        });
    }, []);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj(Object.assign({}, user));
    };

    return (
        <>
            {init ? (
                <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
            ) : (
                "Loading..."
            )}
        </>
    );
}

export default App;
