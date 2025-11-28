import PlayerNavbar from "./PlayerNavbar";
import React from "react";
import { Outlet } from "react-router-dom";

// renders the member navbar and <Outlet> will be used for nested pages

const PlayerLayout = () => {
    return (
        <>
            <PlayerNavbar />
            <Outlet />
        </>
    );
};

export default PlayerLayout;