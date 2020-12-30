import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Auth from "../pages/Auth";
import Home from "../pages/Home";

const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(true);

    return (
        <BrowserRouter>
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </>
                ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;
