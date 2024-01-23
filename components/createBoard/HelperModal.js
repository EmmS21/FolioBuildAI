import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import NavButtonsComponent from './NavButtons';
import StepperComponent from './Steps';
import styles from '../../css/HelpModal.module.css';  
import createTrelloBoard from '../../helpers/createTrelloBoard';
import createTrelloList from '../../helpers/createTrelloList';
import createTrelloCard from '../../helpers/createTrelloCard';
import { formatCardDescription } from '../../helpers/formatCardDescription';
import { groupTicketDetails } from '../../helpers/groupTicketDetails';
import { ref, set } from "firebase/database";
import { auth, db } from '../../firebaseClient';
import { createTaskadeWorkspace, createTaskadeProject, createTaskadeTask } from '../../helpers/createTaskadeWorkspace';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black',
};
  
const HelperModalComponent = ({ open, setOpen, projectData, setSnackbarOpen }) => {
    const [activeStep, setActiveStep] = useState(1);
    const [apiKey, setApiKey] = useState('');
    const [apiToken, setApiToken] = useState(''); 
    const steps = ["Enter Taskade token", "Click Finish to generate your tickets on Taskade"]
    const [workspace, setWorkSpace] = useState('');
    // const steps = ['Signup to Trello & create an API Token', 'Generate a token', 'Connect your Trello'];

    const handleClose = () => {
        setOpen(false);
    };

    const handleApiKeyChange = (event) => {
        setApiKey(event.target.value);
    };

    const handleApiTokenChange = (event) => {
        setApiToken(event.target.value);
    };

    const handleWorkSpaceChange = (event) => {
        setWorkSpace(event.target.value);
    }

    const getTrelloAuthUrl = () => {
        return `https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read,write&response_type=token&key=${apiKey}`;
    };

    const handleFinish = async () => {
        if (projectData && projectData.length > 0) {
            // Create Workspace
            await axios.post('https://49e5-67-85-184-108.ngrok-free.app/api/taskade', {
                type: 'createWorkspace',
                data: { name: workspace },
                apiKey
            });
    
            // Get Workspaces and Find Created Workspace ID
            const workspacesResponse = await axios.post('https://49e5-67-85-184-108.ngrok-free.app/api/taskade', {
                type: 'getWorkspaces',
                apiKey
            });
            const createdWorkspace = workspacesResponse.data.items.find(w => w.name === workspace);
            
            if (createdWorkspace) {
                const workspaceId = createdWorkspace.id;
    
                // Create Projects
                for (const data of projectData) {
                    const title = data.project_title;
                    const description = formatCardDescription(data);
                    await axios.post('https://49e5-67-85-184-108.ngrok-free.app/api/taskade', {
                        type: 'createProject',
                        workspaceId,
                        data: {
                            contentType: "text/markdown",
                            content: `# ${title}\n\n${description}.`
                        },
                        apiKey
                    });
                }
            }
    
            console.log('All tasks created successfully in Taskade.');
        }
        setSnackbarOpen(true);
        setOpen(false);
    };


    // const handleFinish = async () => {
    //     const delay = ms => new Promise(res => setTimeout(res, ms));
    //     if(projectData && projectData.length > 0) {
    //         const boardName = projectData[0].project_title;
    //         const board = await createTrelloBoard(boardName, apiKey, apiToken);
    //         if(board && board.id) {
    //             const listId = await createTrelloList(board.id, "Default List", apiKey, apiToken);
    //             if(listId) {
    //                 const groupedTickets = groupTicketDetails(projectData);

    //                 for(const [title, ticketInfo] of groupedTickets) {
    //                     const cardDescription = formatCardDescription(ticketInfo);
    //                     await createTrelloCard(title, cardDescription, apiKey, apiToken, listId);
    //                     await delay(1000);
    //                 }
    //                 try {
    //                     const user = auth.currentUser;
    //                     if (user) {
    //                         const projectRef = ref(db, `users/${user.uid}/projects/${board.id}`);
    //                         await set(projectRef, { 
    //                             title: boardName,
    //                             trelloBoardUrl: `https://trello.com/b/${board.id}`
    //                         });    
    //                     } else {
    //                         console.error("Error adding project to Firebase:", error);
    //                     }
    //                 } catch (error) {
    //                     console.error("Error adding project to Firestore:", error);
    //                 }
    //             }
    //         }
    //     }
    //     setSnackbarOpen(true);
    //     setOpen(false);
    // }

    const videoId = 'I-xuFUyGMrM'; 
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1`;
    
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <StepperComponent
                        steps={steps}
                        activeStep={activeStep}
                    />
                    {
                        activeStep === 0 && (
                            <div>
                                <p>Enter your Taskade token</p>
                                <input
                                    type="text"
                                    value={apiKey}
                                    onChange={handleApiKeyChange}
                                    placeholder='Enter your taskade token'
                                    className={styles.inputStyle}
                                />
                            </div>
                        )
                    }
                    {
                        activeStep === 1 && (
                            <div>
                                <p>Click Finish to complete the process </p>
                                <input
                                    type="text"
                                    value={workspace}
                                    onChange={handleWorkSpaceChange}
                                    placeholder='Enter a workspace name'
                                    className={styles.inputStyle}
                                />
                            </div>
                        )
                    }
                    <NavButtonsComponent 
                        activeStep={activeStep} 
                        setActiveStep={setActiveStep}
                        steps={steps}
                        onFinish={activeStep === steps.length - 1 ? handleFinish : null}
                    />
                </Box>
            </Modal>
        </>
    //     <>
    //     <Modal
    //         open={open}
    //         onClose={handleClose}
    //         aria-labelledby="modal-modal-title"
    //         aria-describedby="modal-modal-description"
    //     >
    //         <Box sx={style}>
    //             <StepperComponent 
    //                 steps={steps} 
    //                 activeStep={activeStep} 
    //             />
    //             {
    //                 activeStep === 0 && (
    //                     <iframe
    //                         src={videoUrl}
    //                         width="100%"
    //                         height="100%"
    //                         allow="autoplay; encrypted-media"
    //                         allowFullScreen
    //                     ></iframe>
    //             )}
    //             {
    //                 activeStep === 1 && (
    //                     <div>
    //                         <p>Enter your API key, click the URL to get your Twilio token and then click Next</p>                    
    //                         <input
    //                             type="text"
    //                             value={apiKey}
    //                             onChange={handleApiKeyChange}
    //                             placeholder="Enter your API Key"
    //                             className={styles.inputStyle}
    //                         />
    //                         <a 
    //                             href={getTrelloAuthUrl()} 
    //                             target="_blank" 
    //                             rel="noopener noreferrer"
    //                             className={styles.linkStyle}
    //                         >
    //                             {getTrelloAuthUrl()}
    //                         </a>
    //                     </div>
    //             )}
    //             {
    //                 activeStep === 2 && (
    //                     <div>
    //                         <p>Click Finish to create a Trello board for this project. Do not close or refresh, this will automatically close once the process is completed</p>
    //                         {projectData ? (
    //                             <input
    //                                 type="text"
    //                                 value={apiToken}
    //                                 onChange={handleApiTokenChange}
    //                                 placeholder="Enter your token"
    //                                 className={styles.inputStyle}
    //                             />
    //                         ): (
    //                             <p>Loading project data...</p>
    //                         )}
    //                     </div>
    //                 )   
    //             }
    //             <NavButtonsComponent 
    //                 activeStep={activeStep} 
    //                 setActiveStep={setActiveStep}
    //                 steps={steps}
    //                 onFinish={activeStep === steps.length - 1 ? handleFinish : null}
    //             />
    //         </Box>
    //     </Modal>
    //     </>
    )
}

export default HelperModalComponent;


// Link 1 https://trello.com/power-ups/admin