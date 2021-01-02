import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "FBase";

import "components/App/App.scss";

function App() {
    const [init, setInit] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Loading..."}</>;
}

export default App;
