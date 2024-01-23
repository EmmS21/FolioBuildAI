import React, { useEffect, useState } from "react";
import Container from "../container";
import { useRouter } from "next/router";
import styles from "../../css/ProfileHeader.module.css";
import { useDataContext } from "../../context/dataContext";
import { ref as dbRef, get as dbGet } from "firebase/database";
import { db, auth } from "../../firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

const StartNewProjectBttn = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const { user } = useDataContext();

  // const handleStartNewProjectNav = () => {
  //   router.push("/projects");
  // }

  useEffect(() => {
    loadStripe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleStartNewProjectNav = async () => {
    if(currentUser) {
      const allowedEmails = ["emmanuelsibandaus@gmail.com", "emmanuelsibanda21@gmail.com"];
      if (allowedEmails.includes(currentUser.email) || await checkUserSubscription(currentUser.email)) {
        router.push("/projects");
      } 
      else {
        initiateStripePayment();
      }
    }
  };


  const checkUserSubscription = async (userEmail) => {
    try {
      const response = await fetch('/api/getSubscriptionDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await response.json();
      console.log('data', data)
      if (data.expiresOn) {
        const now = new Date().getTime() / 1000; 
        return now < data.expiresOn; 
      }
      return false;
    } catch (error) {
      console.error("Error checking subscription status:", error);
      return false;
    }
  };

  const initiateStripePayment = async () => {
    try {
      const response = await fetch('/api/subscribe', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const session = await response.json();
      console.log("Session ID: ", session.id); 
      if (window.Stripe && session.id) {
        const stripe = Stripe('pk_live_51MDCvLBjfwe0F0pgptpUNU5DgRnjmUGEEl6gSeGop03HwY7aDORQTPHDZXGo0Fy9ccF37jd9NEpHyYNnHMsKjNjm0050FLZ51y');
        stripe.redirectToCheckout({ sessionId: session.id });  
      } else {
        console.error('Stripe.js has not loaded or session ID is invalid.');
      }
    } catch (error) {
      console.error('Error in initiateStripePayment:', error.message);
    }
  };

  const loadStripe = () => {
    if (!window.Stripe) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      document.body.appendChild(script);
    }
  };  

  return (
    <Container 
      className={`flex items-center justify-center h-full ${styles.startNewProjectButton}`}>
      <button 
        className="bg-blue-500 text-white px-8 py-4 rounded"
        onClick={handleStartNewProjectNav}
        >
        Start New Project
      </button>
    </Container>
  );
};

export default StartNewProjectBttn;
