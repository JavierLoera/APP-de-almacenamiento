import React from "react";
import "./styles/SidebarItem.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function SideBarItem({ arrow, icon, label }) {
  return (
    <div className="sidebarItem">
      <div className="sidebarItem__arrow">{arrow && <ArrowRightIcon />} </div>
      <div className="sidebarItem__main">
        {icon} <p>{label}</p>
      </div>
    </div>
  );
}

export default SideBarItem;
