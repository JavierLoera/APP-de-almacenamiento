import React from "react";
import "./styles/FileItem.css";
import { storage, db } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import { doc as documento, deleteDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const FileItem = ({ id, name, caption, timestamp, fileUrl, correoUsuario }) => {
  const fileDate = `${timestamp?.toDate().getDate()} ${
    monthNames[timestamp?.toDate().getMonth() + 1]
  } 
    ${timestamp?.toDate().getFullYear()}`;

  const handleDelete = (doc) => {
    const imgRef = ref(storage, `files/${name}`);
    deleteObject(imgRef)
      .then(async () => {
        const docRef = documento(db, `usuarios/usuarios/${correoUsuario}`, doc);
        await deleteDoc(docRef).then(() => {
          console.log("documento eliminado");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="item">
      <div className="fileItem">
        <img src={fileUrl} alt={caption} />
      </div>
      <div className="description">
        <a href={fileUrl} target="_blank" rel="noreferrer" download>
          <div className="fileItem--left">
            <p>{caption}</p>
          </div>
        </a>
        <div className="fileItem--right">
          <p>{fileDate}</p>
        </div>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            handleDelete(id);
          }}
        >
          <DeleteIcon /> Borrar
        </Button>
      </div>
    </div>
  );
};
export default FileItem;
