const createTrelloCard = async (title, description, apiKey, apiToken, listId) => {
    const url = `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}&idList=${listId}&name=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;

    try {
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();
    } catch (error) {
        console.error('Error creating card:', error);
    }
};

export default createTrelloCard;
