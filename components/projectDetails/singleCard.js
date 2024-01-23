import React from "react";
import styles from "../../css/TicketStyle.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const SingleTicketCard = ({ ticketData, onClose, onBack, onForward, currentIndex, totalTickets }) => {
    const processTests = (testsText) => {
        return testsText.split('\n').map((line, index) => {
            if (line.match(/^\d+\./)) {
                return <li key={index}>{line}</li>;
            } else if (line.trim().startsWith('-')) { 
                return <ul key={index}><li>{line}</li></ul>;
            } else {
                return null; 
            }
        });
    };

    const processLinksAndResources = (linksText) => {
        if (!linksText) return null;    
        const urlRegex = /https?:\/\/[^\s]+/g;
        let matches;
        const elements = [];
    
        while ((matches = urlRegex.exec(linksText)) !== null) {
            const url = matches[0];
            let description = '';
            if (matches.index + url.length < linksText.length) {
                description = linksText.substring(matches.index + url.length, linksText.indexOf('https://', matches.index + url.length)).trim();
            }
            elements.push({ url, description });
        }
    
        return elements.map((item, index) => (
            <li key={index}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                <p>{item.description}</p>
            </li>
        ));
    };
    
    

    const testsContent = processTests(ticketData.tests || '');
    const linksAndResourcesContent = processLinksAndResources(ticketData.links_and_resources);

    // const steps


  return (
    <div className={`${styles.card} singleTicketCard`}>
        <div className={styles.buttonPositioning}>
            <Button variant="outlined" onClick={onBack}><ArrowBackIosIcon/></Button>
            <span>Task {currentIndex + 1} out of {totalTickets}</span> 
            <Button variant="outlined" onClick={onForward}><ArrowForwardIosIcon/></Button>
        </div>

        <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Ticket: { ticketData.ticket_title }</span>
            <Button variant="outlined" onClick={onClose} className={styles.closeButton}><CloseIcon/></Button>
        </div>
        {ticketData.feature !== 'NULL' && (
            <div className={styles.cardContent}>
                <label>Feature:</label>
                <span>{ticketData.feature}</span>
            </div>
        )}
        {ticketData.description !== 'NULL' && (
            <div className={styles.cardContent}>
                <label>Description:</label>
                <span>{ticketData.description}</span>
            </div>
        )}
        {ticketData.expected_behavior !== 'NULL' && (
            <div className={styles.cardContent}>
                <label>Expected Behavior:</label>
                <span>{ticketData.expected_behavior}</span>
            </div>
        )}
        {testsContent && (
            <div className={styles.cardContent}>
                <label>Tests:</label>
                <span>{testsContent}</span>
            </div>
        )}
        {ticketData.steps !== 'NULL' && (
            <div className={styles.cardContent}>
                <label>Steps:</label>
                <span>{ticketData.steps}</span>
            </div>
        )}
        {linksAndResourcesContent && (
            <div className={styles.cardContent}>
                <label>Links and Resources:</label>
                <span>{linksAndResourcesContent}</span>
            </div>
        )}
        {ticketData.story_points !== 'NULL' && (
            <div className={styles.cardContent}>
                <label>Story Points:</label>
                <span>{ticketData.story_points}</span>
            </div>
        )}
    </div>
  );
};
// closeButton

export default SingleTicketCard;


