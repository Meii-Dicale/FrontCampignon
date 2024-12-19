import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({idEmplacement}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const idEmplacementBis = parseInt(idEmplacement, 10);
  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };
  console.log( idEmplacementBis);
  const onFileUpload = (idEmplacementBis) => {

    if (typeof idEmplacement !== 'number') {
        console.error('idEmplacement doit être un entier.');
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('idEmplacement', idEmplacement.idEmplacement);
  
    
   

    axios.post('http://localhost:3001/api/photo/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log('File uploaded successfully:', response.data);
        })
        .catch(error => {
          console.error('There was an error uploading the file!', error);
        });
      
};


  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>
        Upload!
      </button>
    </div>
  );
};

export default ImageUpload;
