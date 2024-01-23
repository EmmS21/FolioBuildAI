// AuthModal.js
import React, { useState } from 'react';
import GoogleButton from './googleButton';
import GitHubButton from './githubButton';
import firebase from 'firebase/app';
import 'firebase/auth';


const AuthModal = ({ setShowAuthModal }) => {
  const [activeSwitch, setActiveSwitch] = useState('google');

  const switchLeft = () => {
    setActiveSwitch('google');
  };

  const switchRight = () => {
    setActiveSwitch('github');
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      console.log('User signed in:', user);
    } catch (error) {
      // Handle errors
      console.error('Google sign-in error:', error.message);
    }
  };

  // const handleGitHubSignIn = async () => {
  //   // Implementation for GitHub Sign In
  // };

  return (
    <div className="modal">
      <div className={`switch-button ${activeSwitch === 'google' ? 'left' : 'right'}`}>
        <span className="active"></span>
        <button className={`switch-button-case left ${activeSwitch === 'google' ? 'active' : ''}`} onClick={switchLeft}>
          Google Sign In
        </button>
        <button className={`switch-button-case right ${activeSwitch === 'github' ? 'active' : ''}`} onClick={switchRight}>
          GitHub Sign In
        </button>
        <button className={'switch-button-case'} onClick={()=>setShowAuthModal(false)}>X</button>
      </div>
      <div className="modal-content">
        <div className="modal-header">
        {activeSwitch === 'google' && (
            <GoogleButton onClick={handleGoogleSignIn}/>
          )}
        {activeSwitch === 'github' && (
            <GitHubButton/>
          )}
        </div>
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50%;
          height: 50%;
          background: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .switch-button {
          width: 100%;
          height: 10%;
          text-align: center;
          position: absolute;
          left: 50%;
          top: 5%;
          transform: translate3D(-50%, -50%, 0);
          will-change: transform;
          z-index: 197 !important;
          cursor: pointer;
          transition: .3s ease all;
          border: 1px solid black;
        }

        .switch-button-case {
          display: inline-block;
          background: none;
          width: 49%;
          height: 100%;
          color: black;
          position: relative;
          border: none;
          transition: .3s ease all;
          text-transform: uppercase;
          letter-spacing: 5px;
          padding-bottom: 1px;
        }

        .switch-button-case:hover {
          color: grey;
          cursor: pointer;
        }

        .switch-button-case:focus {
          outline: none;
        }

        .active {
            color: #151515;
            background-color: grey;
        }        

        .signup-buttons {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }

        .signup-button {
            margin-right: 10px;
            margin-bottom: 40px;
          }
      `}</style>
    </div>
  );
};

export default AuthModal;
