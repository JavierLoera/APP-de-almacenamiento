import React, { useEffect, useState } from "react";
import "./styles/FilesViewer.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import FileItem from "./FileItem";

const FilesViewer = ({ correoUsuario }) => {
  const colRef = collection(db, `usuarios/usuarios/${correoUsuario}`);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      setFiles(snapshot.docs.map((doc) => ({ id: doc.id, item: doc.data() })));
    });
  });

  return (
    <div className="fileViewer">
      {files.length > 0 ? (
        files.map(({ id, item }) => (
          <FileItem
            key={id}
            id={id}
            name={item.name}
            caption={item.caption}
            timestamp={item.timestamp}
            fileUrl={item.fileUrl}
            correoUsuario={correoUsuario}
          />
        ))
      ) : (
        <h3 className="without__photos">No tienes fotos almacenadas aún</h3>
      )}
    </div>
  );
};

export default FilesViewer;
