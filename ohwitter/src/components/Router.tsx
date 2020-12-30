import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Auth from "pages/Auth";
import Home from "pages/Home";

interface AppRouterProps {
    isLoggedIn: boolean;
}

const AppRouter = ({ isLoggedIn }: AppRouterProps) => {
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
