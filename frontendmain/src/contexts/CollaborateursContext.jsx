import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const CollaborateursContext = createContext();

export function CollaborateursProvider({ children }) {
  const [collaborateurs, setCollaborateurs] = useState([]);
  const [loadingCols, setLoadingCols] = useState(true);
  const [errorCols, setErrorCols] = useState(null);

  const fetchCollaborateurs = async () => {
    setLoadingCols(true);
    try {
      const { data } = await api.get('/collaborateurs');
      // Handle the response structure from your API
      setCollaborateurs(data.success ? data.data : data);
      setErrorCols(null);
    } catch (e) {
      console.error(e);
      setErrorCols(e.response?.data || e.message);
      toast.error('Erreur lors du chargement des collaborateurs');
    } finally {
      setLoadingCols(false);
    }
  };

  const createCollaborateur = async (collaborateurData) => {
    try {
      const { data } = await api.post('/collaborateurs', collaborateurData);
      if (data.success) {
        setCollaborateurs(prev => [...prev, data.data]);
        toast.success('Collaborateur ajouté avec succès');
        return { success: true, data: data.data };
      }
      return { success: false, error: data.message };
    } catch (e) {
      console.error(e);
      const errorMessage = e.response?.data?.message || 'Erreur lors de l\'ajout du collaborateur';
      toast.error(errorMessage);
      return { success: false, error: errorMessage, validation: e.response?.data?.errors };
    }
  };

  const updateCollaborateur = async (id, collaborateurData) => {
    try {
      const { data } = await api.put(`/collaborateurs/${id}`, collaborateurData);
      if (data.success) {
        setCollaborateurs(prev => 
          prev.map(col => col.idco === id ? data.data : col)
        );
        toast.success('Collaborateur modifié avec succès');
        return { success: true, data: data.data };
      }
      return { success: false, error: data.message };
    } catch (e) {
      console.error(e);
      const errorMessage = e.response?.data?.message || 'Erreur lors de la modification du collaborateur';
      toast.error(errorMessage);
      return { success: false, error: errorMessage, validation: e.response?.data?.errors };
    }
  };

  const deactivateCollaborateur = async (id) => {
    try {
      const { data } = await api.delete(`/collaborateurs/${id}`);
      if (data.success) {
        setCollaborateurs(prev => prev.filter(col => col.idco !== id));
        toast.success('Collaborateur désactivé avec succès');
        return { success: true };
      }
      return { success: false, error: data.message };
    } catch (e) {
      console.error(e);
      const errorMessage = e.response?.data?.message || 'Erreur lors de la désactivation du collaborateur';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const getCollaborateur = async (id) => {
    try {
      const { data } = await api.get(`/collaborateurs/${id}`);
      return data.success ? { success: true, data: data.data } : { success: false, error: data.message };
    } catch (e) {
      console.error(e);
      const errorMessage = e.response?.data?.message || 'Erreur lors du chargement du collaborateur';
      return { success: false, error: errorMessage };
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
      refresh: fetchCollaborateurs,
      createCollaborateur,
      updateCollaborateur,
      deactivateCollaborateur,
      getCollaborateur
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