import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import SidebarItem from "./SidebarItem";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StorageIcon from "@mui/icons-material/Storage";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import "./styles/Navbar.css";

import { signOut, getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase";

const auth = getAuth(firebaseApp);
const drawerWidth = 190;

function ResponsiveDrawer({ userPhoto, name, window }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      <SidebarItem arrow icon={<InsertDriveFileIcon />} label={"Mis Datos"} />
      <SidebarItem
        arrow
        icon={<ImportantDevicesIcon />}
        label={"Computadoras"}
      />
      <SidebarItem icon={<PeopleAltIcon />} label={"Compartidos conmigo"} />
      <SidebarItem icon={<QueryBuilderIcon />} label={"Recientes"} />
      <SidebarItem icon={<StarBorderIcon />} label={"Favoritos"} />
      <SidebarItem icon={<DeleteOutlineIcon />} label={"Papelera"} /> <hr />
      <SidebarItem icon={<StorageIcon />} label={"Almacenamiento"} />
    </List>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <div className="header">
            <div className="header__logo">
              <img src="logo192.png" alt="logo" /> <span>Almacenamiento</span>
            </div>
            <div className="header__searchContainer">
              <div className="header__searchBar">
                <SearchIcon />
                <input type="text" placeholder="Buscar en almacenamiento" />
              </div>
            </div>
            <div className="user__name">{name}</div>

            <div className="header__icons">
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={() => {
                  signOut(auth);
                }}
              >
                Salir
              </Button>
              <span>
                <SettingsIcon />
              </span>
              <Avatar className="header__iconsAvatar" src={userPhoto} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              marginTop: "65px",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
