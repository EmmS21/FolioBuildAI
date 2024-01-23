const groupTicketDetails = (data) => {
    const groupedData = new Map();
    data.forEach(ticket => {
        if(!groupedData.has(ticket.ticket_title)) {
            groupedData.set(ticket.ticket_title, {
                description: ticket.description !== 'NULL' ? [ticket.description] : [],
                storyPoints: ticket.story_points !== 'NULL' ? ticket.story_points : '',
                steps: [],
                tests: [],
                features: ticket.feature !== 'NULL' ? [ticket.feature] : [],
                expectedBehavior: ticket.expected_behavior !== 'NULL' ? [ticket.expected_behavior] : [],
                linksAndResources: []
            });
        }
        const ticketDetails = groupedData.get(ticket.ticket_title);
        if (ticket.description !== 'NULL') ticketDetails.description.push(ticket.description);
        if(ticket.steps !== 'NULL') ticketDetails.steps.push(ticket.steps);
        if(ticket.tests !== 'NULL') ticketDetails.tests.push(ticket.tests);
        if(ticket.feature !== 'NULL') ticketDetails.features.push(ticket.feature);
        if(ticket.expected_behavior !== 'NULL') ticketDetails.expectedBehavior.push(ticket.expected_behavior);
        if(ticket.links_and_resources !== 'NULL') ticketDetails.linksAndResources.push(ticket.links_and_resources);
    });
    return groupedData;
}

export { groupTicketDetails };