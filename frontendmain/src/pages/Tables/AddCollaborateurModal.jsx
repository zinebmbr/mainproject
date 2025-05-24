import React, { useState } from 'react';
import { useCollaborateurs } from '../../contexts/CollaborateursContext';

export default function AddCollaborateurModal({ isOpen, onClose }) {
  const { createCollaborateur } = useCollaborateurs();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cin: '',
    sexe: '',
    daten: '',
    situation: '',
    ville: '',
    adresse: '',
    lieun: '',
    numtel: '',
    categorie_professionel: '',
    nature_emploi: '',
    couverture: '',
    ppr: '',
    date_recrutement: '',
    service: '',
    actif: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await createCollaborateur(formData);
    
    if (result.success) {
      // Reset form
      setFormData({
        nom: '',
        prenom: '',
        cin: '',
        sexe: '',
        daten: '',
        situation: '',
        ville: '',
        adresse: '',
        lieun: '',
        numtel: '',
        categorie_professionel: '',
        nature_emploi: '',
        couverture: '',
        ppr: '',
        date_recrutement: '',
        service: '',
        actif: true
      });
      onClose();
    } else {
      if (result.validation) {
        setErrors(result.validation);
      }
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Ajouter un collaborateur</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.nom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Saisissez le nom"
              />
              {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom[0]}</p>}
            </div>

            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.prenom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Saisissez le prénom"
              />
              {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom[0]}</p>}
            </div>

            {/* CIN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CIN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cin"
                value={formData.cin}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cin ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Saisissez le CIN"
              />
              {errors.cin && <p className="text-red-500 text-xs mt-1">{errors.cin[0]}</p>}
            </div>

            {/* Sexe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sexe <span className="text-red-500">*</span>
              </label>
              <select
                name="sexe"
                value={formData.sexe}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.sexe ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionnez le sexe</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
              {errors.sexe && <p className="text-red-500 text-xs mt-1">{errors.sexe[0]}</p>}
            </div>

            {/* Date de naissance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input
                type="date"
                name="daten"
                value={formData.daten}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Situation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Situation <span className="text-red-500">*</span>
              </label>
              <select
                name="situation"
                value={formData.situation}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.situation ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionnez la situation</option>
                <option value="Célibataire">Célibataire</option>
                <option value="Marié">Marié</option>
                <option value="Divorcé">Divorcé</option>
              </select>
              {errors.situation && <p className="text-red-500 text-xs mt-1">{errors.situation[0]}</p>}
            </div>

            {/* Ville */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Saisissez la ville"
              />
            </div>

            {/* Adresse */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Saisissez l'adresse"
              />
            </div>

            {/* Lieu de naissance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance</label>
              <input
                type="text"
                name="lieun"
                value={formData.lieun}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Lieu de naissance"
              />
            </div>

            {/* Numéro de téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="text"
                name="numtel"
                value={formData.numtel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Numéro de téléphone"
              />
            </div>

            {/* Catégorie professionnelle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie professionnelle</label>
              <input
                type="text"
                name="categorie_professionel"
                value={formData.categorie_professionel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Catégorie professionnelle"
              />
            </div>

            {/* Nature d'emploi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nature d'emploi</label>
              <input
                type="text"
                name="nature_emploi"
                value={formData.nature_emploi}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nature d'emploi"
              />
            </div>

            {/* Couverture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Couverture</label>
              <input
                type="text"
                name="couverture"
                value={formData.couverture}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Couverture"
              />
            </div>

            {/* PPR */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PPR</label>
              <input
                type="number"
                name="ppr"
                value={formData.ppr}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.ppr ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Numéro PPR"
              />
              {errors.ppr && <p className="text-red-500 text-xs mt-1">{errors.ppr[0]}</p>}
            </div>

            {/* Date de recrutement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de recrutement</label>
              <input
                type="date"
                name="date_recrutement"
                value={formData.date_recrutement}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Service"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? 'Ajout...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}