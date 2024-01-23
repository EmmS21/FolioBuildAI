import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Container from "../container";
import styles from "../../css/ProfileHeader.module.css";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, storage, db } from "../../firebaseClient";
import { FaCamera } from 'react-icons/fa';
import { ref as dbRef, get as dbGet } from "firebase/database";
import { useDataContext } from "../../context/dataContext";

const ProfileHeader = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState(null); 
  const [projectCount, setProjectCount] = useState(0);
  const [showProjects, setShowProjects] = useState(false);
  const [projectTitles, setProjectTitles] = useState([]);
  const fileInputRef = useRef(null);
  const [subscriptionExpiration, setSubscriptionExpiration] = useState('');
  const { user, setUser } = useDataContext()

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleCameraIconClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const fetchStripeSubscriptionDetails = async (authUserEmail) => {
    try {
      const response = await fetch('/api/getSubscriptionDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: authUserEmail }),
      });
      const data = await response.json();
      if (data.expiresOn) {
        setSubscriptionExpiration(new Date(data.expiresOn * 1000).toLocaleDateString());
      }
    } catch (error) {
      console.error("Error fetching subscription details from Stripe:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const storageRef = ref(storage, `users/${authUser.uid}/profile-picture.jpg`);
        try {
          const url = await getDownloadURL(storageRef);
          setProfilePictureURL(url);
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }

        const projectsRef = dbRef(db, `users/${authUser.uid}/projects`);
        try {
          const snapshot = await dbGet(projectsRef);
          if(snapshot.exists()) {
            const projects = snapshot.val();
            const projectCount = Object.keys(projects).length;
            const titles = Object.values(projects).map(project => project.title);
            setProjectTitles(titles);
            setProjectCount(projectCount);
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
        if(authUser.email){
          fetchStripeSubscriptionDetails(authUser.email);
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if(file && user) {
      const storageRef = ref(storage, `users/${user.uid}/profile-picture.jpg`);
      try {
        await uploadBytes(storageRef, file);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const toggleProjects = () => {
    setShowProjects(!showProjects);
  };  

  return (
    <Container className={`flex flex-wrap ${styles.profileHeader} `}>
      <div className={`flex ${styles.leftSection}`}>
        <div className="relative w-64 h-64 overflow-hidden rounded-full">
          {profilePictureURL ? (
            <Image
              src={profilePictureURL}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
            />
          ): (
            <div className="placeholder">No Profile Picture</div> 
          )}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity opacity-0 hover:opacity-100">
            <FaCamera 
              size={24} 
              className="text-white cursor-pointer"
              onClick={handleCameraIconClick} 
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg">{user ? user.displayName : 'User'}</span>
          <span className="font-bold text-lg">{user ? user.email : 'user@gmail.com'}</span>
          {subscriptionExpiration && (
            <span className="text-sm">Subscription expires on: {subscriptionExpiration}</span>
          )}
        </div>
      </div>
      <div className={`flex items-center space-x-4 ${styles.rightSection}`}>
        <button 
          className="bg-transparent text-white px-4 py-2 rounded transition-transform transform-gpu hover:shadow-up hover:bg-blue-500 hover:text-white focus:outline-none focus:ring focus:border-blue-300 mb-10"
          onClick={toggleProjects}
        >
            Projects Added: {projectCount}
        </button>
        {showProjects && (
          <ul>
            {projectTitles.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        ref={fileInputRef}
      />
      {isUploadModalOpen && (
        <ProfilePictureUpload closeModal={closeUploadModal} user={user}/>
      )}
    </Container>
  );
};

export default ProfileHeader;
