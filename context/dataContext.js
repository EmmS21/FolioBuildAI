import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext()

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [projectData, setProjectData] = useState(null);
    const [user, setUser] = useState(null); 

    return (
      <DataContext.Provider value={{ projectData, setProjectData, user, setUser }}>
        {children}
      </DataContext.Provider>
    );
  };
