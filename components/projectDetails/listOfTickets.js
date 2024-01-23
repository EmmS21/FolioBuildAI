import React from "react";
import styles from "../../css/ProjectStyles.module.css";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import { ListItem, ListItemButton } from "@mui/material";
import { useDataContext } from "../../context/dataContext";

const TicketsCard = ({ onTicketSelect }) => {
    const { projectData } = useDataContext();
    const categoriesToTickets = new Map();

    if(Array.isArray(projectData) && projectData.length > 0 && !projectData.error){
        projectData.forEach(item => {
            if (!categoriesToTickets.has(item.category)) {
                categoriesToTickets.set(item.category, new Set());
            }
            categoriesToTickets.get(item.category).add(item.ticket_title);
        });
    } else {
        return <div>Loading...</div>;
    }

    const sortedCategoriesToTickets = new Map(
        [...categoriesToTickets].map(([category, ticketsSet]) => {
            const ticketsArray = Array.from(ticketsSet);
            ticketsArray.sort((a, b) => {
                const numA = parseInt(a.match(/\d+/), 10);
                const numB = parseInt(b.match(/\d+/), 10);
                return numA - numB;
            });
            return [category, ticketsArray];
        })
    );
    

    return (
        <div>
            {[...sortedCategoriesToTickets.keys()].map((category, index) => (
                <Accordion key={index} className={styles.halfWidthAccordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}bh-content`}
                        id={`panel${index}bh-header`}
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {category || "General Settings"}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{projectData[0].project_title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {[...sortedCategoriesToTickets.get(category)].map((title, titleIndex) => (
                                <ListItem key={titleIndex}
                                    onClick={() => onTicketSelect({title})}>
                                    <ListItemButton>
                                        {title}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
      );
};

export default TicketsCard;
