import axios from 'axios';

export const createTaskadeWorkspace = async () => {
    const response = await axios.post('/api/taskade', {
        name: 'Project Build'
    });
    return response.data.id; 
};

export const createTaskadeProject = async (workspaceId, projectName) => {
    const response = await axios.post('/api/taskade', {
        workspaceId: workspaceId,
        name: projectName
    });
    return response.data.id; 
};

export const createTaskadeTask = async (projectId, title, description) => {
    await axios.post('/api/taskade', {
        projectId: projectId,
        title: title,
        description: description
    });
};