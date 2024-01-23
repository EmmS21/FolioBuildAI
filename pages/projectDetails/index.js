import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Snackbar } from "@mui/material";
import Head from "next/head";
import ProjectsHeader from "../../components/projects/projectsHeader";
import TicketsCard from "../../components/projectDetails/listOfTickets"
import SingleTicketCard from "../../components/projectDetails/singleCard";
import styles from "../../css/ProjectStyles.module.css";
import { useDataContext } from "../../context/dataContext";
import Button from '@mui/material/Button';
import HelperModalComponent from "../../components/createBoard/HelperModal";
// import withAuth from "../../routes/withAuth";


const ProjectDetails = () => {
    const { projectData, setProjectData } = useDataContext();
    const [ticketCardVisible, setTicketCardVisible] = useState(false);
    const [selectedTicketData, setSelectedTicketData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const router = useRouter();

    console.log('projectData***', projectData)
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
      router.push('/dashboard');
    }

    const handleTicketSelect = (selectedTitle) => {
        const foundTicket = projectData.filter(item => item.ticket_title === selectedTitle.title);
        setSelectedTicketData(foundTicket);
        setCurrentIndex(0);
        setTicketCardVisible(true);
    };

    const handleNext = () => {
      if (currentIndex < selectedTicketData.length - 1) {
          setCurrentIndex(currentIndex + 1);
      }
    };

    const handleBack = () => {
      if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
      }
    };

    function handleCloseCard () {
      setTicketCardVisible(false);
    };

    

    useEffect(() => {
      // const formattedTitle = `${router.query.title.toLowerCase().replace(/\s+/g, '_')}_details`;
      const formattedTitle = router.query.title ? `${router.query.title.toLowerCase().replace(/\s+/g, '_')}_details` : '';
      const fetchProjectDetails = async (formattedTitle) => {
        try {
          const response = await fetch('/api/fetchProjectDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName: formattedTitle }),
          });
          const data = await response.json();
          setProjectData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchProjectDetails(formattedTitle);
    }, [router.query.title, setProjectData]);

    console.log('selected', selectedTicketData)
    

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
      <ProjectsHeader currCat={"Project Tickets"}/>
      <HelperModalComponent 
        open={open} 
        setOpen={setOpen}
        projectData={open ? projectData: null }
        setSnackbarOpen={setSnackbarOpen}
      />
      <div className={styles.ticketsContainer}>
          <TicketsCard onTicketSelect={handleTicketSelect} />
              {ticketCardVisible && selectedTicketData.length > 0 &&
              <SingleTicketCard 
                className={styles.singleTicketCardPosition}
                ticketData={selectedTicketData[currentIndex]}
                onBack={handleBack}
                onForward={handleNext}
                currentIndex={currentIndex}
                totalTickets={selectedTicketData.length}
                onClose={handleCloseCard} 
                />
              }
      </div>
      <div className={styles.centerContainer}>
        <Button 
          variant="outlined" 
          className={styles.largeButton}
          onClick={() => setOpen(true)}
        >
            Add Project
        </Button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message="Your project board has been created on Trello"
      />
    </>
  );
}
// centerContainer
export default ProjectDetails;