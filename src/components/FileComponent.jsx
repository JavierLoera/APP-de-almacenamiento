import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import "../components/styles/FileComponent.css";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import shortid from "shortid";

function getModalStyle() {
  return { top: `20%`, left: `50%`, transform: `translate(-50%, -50%)` };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function FileComponent({ correoUsuario }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    if (file == null) {
      setUploading(false);
      setOpen(false);
      return;
    }
    const imageRef = ref(storage, `files/${shortid.generate()}${file.name}`);
    let nameStorage;
    await uploadBytes(imageRef, file).then((snapshot) => {
      nameStorage = snapshot.metadata.name;
    });
    getDownloadURL(imageRef).then((url) => {
      const colRef = collection(db, `usuarios/usuarios/${correoUsuario}`);
      addDoc(colRef, {
        name: nameStorage,
        timestamp: serverTimestamp(),
        caption: file.name,
        fileUrl: url,
      });
    });
    setUploading(false);
    setOpen(false);
    setFile(null);
  };

  return (
    <div className="file">
      <div className="file__container" onClick={handleOpen}>
        <AddIcon fontSize="large" /> <p>Subir</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <p>Selecciona el archivo a subir!</p>
          {uploading ? (
            <p>Subiendo...</p>
          ) : (
            <>
              <input type="file" onChange={handleChange} />
              <button onClick={handleUpload}>Cargar</button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default FileComponent;
