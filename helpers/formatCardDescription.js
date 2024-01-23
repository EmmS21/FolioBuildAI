const formatCardDescription = (ticketInfo) => {
    let description = '';
    if (ticketInfo.description) description += `Description: ${ticketInfo.description}\n`;
    if (ticketInfo.storyPoints) description += `Story Points: ${ticketInfo.storyPoints}\n`;

    if (ticketInfo.steps.length > 0) description += `Steps: ${ticketInfo.steps.join('\n')}\n`;
    if (ticketInfo.tests.length > 0) description += `Tests: ${ticketInfo.tests.join('\n')}\n`;
    if (ticketInfo.features.length > 0) description += `Feature: ${ticketInfo.features.join('\n')}\n`;
    if (ticketInfo.expectedBehavior.length > 0) description += `Expected Behavior: ${ticketInfo.expectedBehavior.join('\n')}\n`;
    if (ticketInfo.linksAndResources.length > 0) description += `Links and Resources: ${ticketInfo.linksAndResources.join('\n')}\n`;

    return description;
};

export { formatCardDescription };