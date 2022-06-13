import { useState } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FilesViewer from "./components/FilesViewer";
import { firebaseApp } from "./firebase";

import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import FileComponent from "./components/FileComponent";
import ResponsiveDrawer from "./components/Nabvar";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const theme = createTheme();
function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {user ? (
          <>
            <ResponsiveDrawer
              name={user?.displayName}
              userPhoto={user?.photoURL}
            />
            <FileComponent correoUsuario={user.email} />

            <div className="app__main">
              <FilesViewer correoUsuario={user.email} />
            </div>
          </>
        ) : (
          <div className="app__login">
            <img src="logo512.png" alt="Storage" />
            <button
              onClick={() => {
                signInWithRedirect(auth, googleProvider);
              }}
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
