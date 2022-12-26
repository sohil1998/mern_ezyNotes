import React from "react";
import "../App.css";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <div className="navRoot">
      <div className="Row-Spacebtn">
        <h1 className="textStyle">ezyNotes</h1>
        <div className="Row">
          <span className="logoutIcon">
            <AccountCircleIcon />
          </span>
          <span className="logoutIcon">
            <LogoutIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
