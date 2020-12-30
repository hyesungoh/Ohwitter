import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "FBase";

import "components/App/App.scss";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    
    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn} />
        </>
    );
}

export default App;
