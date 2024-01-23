import React, { useState } from "react";
import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";
import { benefitOne, benefitTwo } from "../components/data";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Cta from "../components/cta";
import PopupWidget from "../components/popupWidget";
import GoogleSignInRedirect from "../helpers/googleAuth";

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

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
      <Navbar setShowAuthModal={setShowAuthModal}/>
      <Hero showAuthModal={showAuthModal} setShowAuthModal={setShowAuthModal}/>
      <SectionTitle
        pretitle="Features"
        title="What you will get">
        FolioBuildAI makes building a portfolio easy. We create an environment to help you gain more real world experience, ensuring you not only build a portfolio that will stand out, but the confidence to add value as an entry level software engineer.
      </SectionTitle>
      <GoogleSignInRedirect/>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <Cta />
      <Footer />
      <PopupWidget />
    </>
  );
}

export default Home;