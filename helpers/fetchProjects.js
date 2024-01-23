const fetchProjects = async (title) => {
    const response = await fetch('/api/fetchProjectsDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName: title }),
    });
    const data = await response.json();
    return data;
}

export { fetchProjects }