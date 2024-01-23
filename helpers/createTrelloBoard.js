const createTrelloBoard = async (boardName, apiKey, apiToken) => {
    const url = `https://api.trello.com/1/boards/?name=${encodeURIComponent(boardName)}&key=${apiKey}&token=${apiToken}`;
    try {
        const response = await fetch(url, { method: 'POST' });
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const board = await response.json();
        return board;
    } catch (error) {
        console.error('Error creating board:', error);
    }
}

export default createTrelloBoard;