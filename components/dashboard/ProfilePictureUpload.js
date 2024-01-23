import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebaseClient";

const ProfilePictureUpload = ({ closeModal, user }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile && user) {
      const storageRef = ref(storage, `users/${user.uid}/profile-picture.jpg`);

      try {
        await uploadBytes(storageRef, selectedFile);
        closeModal();
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ProfilePictureUpload;
