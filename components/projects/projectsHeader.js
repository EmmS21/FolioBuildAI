import React from "react";
import Link from "next/link";
import { auth } from "../../firebaseClient";
import { signOut } from "firebase/auth";
import styles from "../../css/ProjectStyles.module.css";


const ProjectsHeader = ({ currCat }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
      <div className={styles.header}>
        <h1>{currCat}</h1>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/dashboard" className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5"
            >
                Back to Dashboard
          </Link>
          <button
            onClick={handleSignOut}
            className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  };

export default ProjectsHeader;
