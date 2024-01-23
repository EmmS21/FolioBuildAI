const createTrelloList = async (boardId, listName, apiKey, apiToken) => {
    const url = `https://api.trello.com/1/lists?name=${encodeURIComponent(listName)}&idBoard=${boardId}&key=${apiKey}&token=${apiToken}`;
    try {
        const response = await fetch(url, { method: 'POST' });
        const list = await response.json();
        return list.id;
    } catch (error) {
        console.error('Error creating list:', error);
    }
}

export default createTrelloList;