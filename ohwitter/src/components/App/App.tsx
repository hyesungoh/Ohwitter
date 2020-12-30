import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "FBase";

import "components/App/App.scss";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<any>(authService.currentUser);

    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn} />
        </>
    );
}

export default App;
