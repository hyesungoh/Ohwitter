import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Auth from "pages/Auth";
import Home from "pages/Home";
import Profile from "pages/Profile";
import Navigation from "components/Navigation";

interface AppRouterProps {
    isLoggedIn: boolean;
    userObj: firebase.default.User | null;
    refreshUser: Function;
}

const AppRouter = ({ refreshUser, isLoggedIn, userObj }: AppRouterProps) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile
                                refreshUser={refreshUser}
                                userObj={userObj}
                            />
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
