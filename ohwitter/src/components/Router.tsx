import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Auth from "pages/Auth";
import Home from "pages/Home";
import Profile from "pages/Profile";
import Navigation from "components/Navigation";

interface AppRouterProps {
    isLoggedIn: boolean;
}

const AppRouter = ({ isLoggedIn }: AppRouterProps) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
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
