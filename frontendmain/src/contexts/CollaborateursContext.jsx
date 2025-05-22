import React, {
    createContext,
    useContext,
    useState,
    useEffect
  } from 'react';
  import api from '../api';
  
  const CollaborateursContext = createContext();
  
  export function CollaborateursProvider({ children }) {
    const [collaborateurs, setCollaborateurs] = useState([]);
    const [loadingCols, setLoadingCols] = useState(true);
    const [errorCols, setErrorCols]     = useState(null);
  
    const fetchCollaborateurs = async () => {
      setLoadingCols(true);
      try {
        const { data } = await api.get('/collaborateurs');
        setCollaborateurs(data);
      } catch (e) {
        console.error(e);
        setErrorCols(e.response?.data || e.message);
      } finally {
        setLoadingCols(false);
      }
    };
  
    useEffect(() => {
      fetchCollaborateurs();
    }, []);
  
    return (
      <CollaborateursContext.Provider value={{
        collaborateurs,
        loadingCols,
        errorCols,
        refresh: fetchCollaborateurs
      }}>
        {children}
      </CollaborateursContext.Provider>
    );
  }
  
  export const useCollaborateurs = () => {
    const ctx = useContext(CollaborateursContext);
    if (!ctx) throw new Error('useCollaborateurs must live inside CollaborateursProvider');
    return ctx;
  };
  