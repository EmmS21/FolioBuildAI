import React, { useState, useEffect } from "react";
import Head from "next/head";
import ProjectCard from "../../components/projects/cards";
import ProjectsHeader from "../../components/projects/projectsHeader";
import ResultsTable from "../../components/projects/resultsTable";
import withAuth from "../../routes/withAuth";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebaseClient";
import { ref as dbRef, get as dbGet } from "firebase/database";

const ProjectsPage = () => {
  const [fintechData, setFintechData] = useState([])
  const [hasMore, setHasMore] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const fetchFintechProjects = async () => {
    const response = await fetch('/api/fetchFintechProjects');
    const data = await response.json();
    setFintechData(data);
    setHasMore(false)
  };

  const loadMoreData = () => {
    console.log("Load more data here...");
    fetchFintechProjects();
  }

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (authUser) => {
        if(authUser) {
          resolve(authUser);
        } else {
          resolve(null);
        }
      }, reject);
    });
  };

  useEffect(() => {
    getCurrentUser().then(authUser => {
      if(authUser) {
        setUser(authUser);
        checkAccess(authUser);
      } else {
        router.push('/');
      }
    });
  }, []);

  const checkAccess = async (authUser) => {
    const allowedEmails = ["emmanuelsibandaus@gmail.com", "emmanuelsibanda21@gmail.com"];
    if (allowedEmails.includes(authUser.email)) {
      return;
    }
    const isSubscribed = await hasActiveSubscription(authUser.uid);
    if (!isSubscribed) {
      router.push('/'); 
    }
  };

  const hasActiveSubscription = async (userId) => {
    const subscriptionRef = dbRef(db, `users/${userId}/subscription`);
    try {
      const snapshot = await dbGet(subscriptionRef);
      if (snapshot.exists()) {
        const subscription = snapshot.val();
        return subscription.active;
      }
      return false;
    } catch (error) {
      console.error("Error checking subscription status:", error);
      return false;
    }
  };


  useEffect(() => {
    if(router.query.category === "FinTech"){
      fetchFintechProjects();
    }
  }, [router.query.category])


  return (
    <>
      <Head>
        <title>FolioBuildAI - Build a portfolio of real world projects to land your dream dev job</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProjectsHeader currCat={"Pick a Category"}/>
      <ProjectCard onCategorySelect={fetchFintechProjects}/>
      <ResultsTable data={fintechData} fetchData={loadMoreData} hasMore={hasMore}/>
    </>
  );
}

export default withAuth(ProjectsPage);
