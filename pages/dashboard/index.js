import React from "react";
import Head from "next/head";
import Footer from "../../components/footer";
import ProfileHeader from "../../components/dashboard/header";
import LogoutNavBar from "../../components/dashboard/logoutNav";
import StartNewProjectBttn from "../../components/dashboard/startNewChallenge";
import withAuth from "../../routes/withAuth";

const ProfilePage = () => {
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
      <LogoutNavBar/>
      <ProfileHeader/>
      <StartNewProjectBttn/>
      <Footer />
    </>
  );
}

export default withAuth(ProfilePage);