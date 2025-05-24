import React, { useState, useMemo, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { useCollaborateurs } from '../../contexts/CollaborateursContext';
import AddCollaborateurModal from './AddCollaborateurModal';

// Enhanced Actions dropdown component
function ActionsDropdown({ collaborateur, onDeactivate, onEdit, onViewDetails, onExport }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleAction = (action, e) => {
    e.stopPropagation();
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        title="Actions"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              <button
                onClick={(e) => handleAction(() => onViewDetails(collaborateur), e)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Détail
              </button>
              
              <button
                onClick={(e) => handleAction(() => onEdit(collaborateur), e)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </button>
              
              <button
                onClick={(e) => handleAction(() => onExport(collaborateur), e)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exporter
              </button>
              
              <hr className="my-1" />
              
              <button
                onClick={(e) => handleAction(() => onDeactivate(collaborateur), e)}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                </svg>
                Désactiver
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Status badge component
function StatusBadge({ status }) {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'inactif':
        return 'bg-red-100 text-red-800';
      case 'en congé':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(status)}`}>
      {status || 'Actif'}
    </span>
  );
}

// Bulk actions component
function BulkActions({ selectedRows, onBulkDeactivate, onBulkExport, onClearSelection }) {
  if (selectedRows.length === 0) return null;

  return (
    <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md mb-4">
      <span className="text-sm text-blue-700 font-medium">
        {selectedRows.length} collaborateur(s) sélectionné(s)
      </span>
      <div className="flex gap-2 ml-auto">
        <button
          onClick={onBulkExport}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Exporter
        </button>
        <button
          onClick={onBulkDeactivate}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Désactiver
        </button>
        <button
          onClick={onClearSelection}
          className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

export default function CollaborateursTable() {
  const { collaborateurs, loadingCols, errorCols, deactivateCollaborateur } = useCollaborateurs();
  const [searchText, setSearchText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'nom', direction: 'asc' });
  const tableRef = useRef();

  // Enhanced filter logic
  const filteredData = useMemo(() => {
    let filtered = collaborateurs;

    // Text search
    if (searchText) {
      const lower = searchText.toLowerCase();
      filtered = filtered.filter(item =>
        [item.nom, item.prenom, item.cin, item.ville, item.numtel, item.service, item.email]
          .some(field => field?.toString().toLowerCase().includes(lower))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => 
        (item.statut || 'actif').toLowerCase() === statusFilter
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => 
        item.categorie_professionel === categoryFilter
      );
    }

    return filtered;
  }, [collaborateurs, searchText, statusFilter, categoryFilter]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = [...new Set(collaborateurs.map(c => c.categorie_professionel).filter(Boolean))];
    return cats.sort();
  }, [collaborateurs]);

  // Age calculator
  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return `${age} ans`;
  };

  // Export functions
  const exportToCSV = (data, filename = 'collaborateurs') => {
    const headers = ['Nom', 'Prénom', 'CIN', 'Catégorie', 'Âge', 'Téléphone', 'Email', 'Ville', 'Service'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.nom || '',
        row.prenom || '',
        row.cin || '',
        row.categorie_professionel || '',
        calculateAge(row.daten).replace(' ans', ''),
        row.numtel || '',
        row.email || '',
        row.ville || '',
        row.service || ''
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Enhanced table columns
  const columns = [
    {
      name: 'Nom',
      selector: row => row.nom,
      sortable: true,
      cell: row => (
        <div className="flex flex-col">
          <div className="font-medium text-gray-900">{row.nom || '-'}</div>
          {row.email && <div className="text-xs text-gray-500">{row.email}</div>}
        </div>
      ),
      width: '200px',
    },
    {
      name: 'Prénom',
      selector: row => row.prenom,
      sortable: true,
      cell: row => <div className="text-gray-700">{row.prenom || '-'}</div>,
    },
    {
      name: 'CIN',
      selector: row => row.cin,
      sortable: true,
      cell: row => <div className="font-mono text-sm">{row.cin || '-'}</div>,
    },
    {
      name: 'Catégorie',
      selector: row => row.categorie_professionel,
      sortable: true,
      cell: row => (
        <div className="text-sm">
          <div className="text-gray-600">{row.categorie_professionel || '-'}</div>
          {row.service && <div className="text-xs text-gray-400">{row.service}</div>}
        </div>
      ),
    },
    {
      name: 'Âge',
      selector: row => row.daten,
      sortable: true,
      cell: row => <div className="text-sm">{calculateAge(row.daten)}</div>,
    },
    {
      name: 'Contact',
      selector: row => row.numtel,
      sortable: true,
      cell: row => (
        <div className="text-sm">
          <div className="font-mono">{row.numtel || '-'}</div>
          {row.ville && <div className="text-xs text-gray-500">{row.ville}</div>}
        </div>
      ),
    },
    {
      name: 'Statut',
      selector: row => row.statut,
      sortable: true,
      cell: row => <StatusBadge status={row.statut} />,
    },
    {
      name: 'Action',
      cell: row => (
        <ActionsDropdown
          collaborateur={row}
          onDeactivate={handleDeactivate}
          onEdit={handleEdit}
          onViewDetails={handleViewDetails}
          onExport={handleExportSingle}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  // Enhanced custom styles
  const customStyles = {
    header: {
      style: {
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px',
      }
    },
    headRow: {
      style: {
        backgroundColor: '#3b82f6',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        minHeight: '48px',
      }
    },
    headCells: {
      style: {
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
      }
    },
    rows: {
      style: {
        minHeight: '60px',
        '&:hover': {
          backgroundColor: '#f8fafc',
        }
      }
    },
    cells: {
      style: {
        paddingTop: '12px',
        paddingBottom: '12px',
      }
    }
  };

  // Event handlers
  const handleDeactivate = async (collaborateur) => {
    if (window.confirm(`Êtes-vous sûr de vouloir désactiver ${collaborateur.nom} ${collaborateur.prenom} ?`)) {
      try {
        await deactivateCollaborateur(collaborateur.idco);
      } catch (error) {
        alert('Erreur lors de la désactivation: ' + error.message);
      }
    }
  };

  const handleEdit = (collaborateur) => {
    console.log('Edit:', collaborateur);
    // TODO: Implement edit functionality
  };

  const handleViewDetails = (collaborateur) => {
    console.log('Details:', collaborateur);
    // TODO: Implement details modal
  };

  const handleExportSingle = (collaborateur) => {
    exportToCSV([collaborateur], `collaborateur_${collaborateur.nom}_${collaborateur.prenom}`);
  };

  const handleBulkDeactivate = async () => {
    const names = selectedRows.map(row => `${row.nom} ${row.prenom}`).join(', ');
    if (window.confirm(`Désactiver les collaborateurs suivants ?\n${names}`)) {
      try {
        await Promise.all(selectedRows.map(row => deactivateCollaborateur(row.idco)));
        setSelectedRows([]);
      } catch (error) {
        alert('Erreur lors de la désactivation: ' + error.message);
      }
    }
  };

  const handleBulkExport = () => {
    exportToCSV(selectedRows, 'collaborateurs_selection');
  };

  const handleExportAll = () => {
    exportToCSV(filteredData, 'tous_collaborateurs');
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const clearFilters = () => {
    setSearchText('');
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  if (loadingCols) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Chargement des collaborateurs…</span>
      </div>
    );
  }

  if (errorCols) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-600 font-medium">Erreur de chargement</div>
        <div className="text-red-500 text-sm mt-1">{errorCols}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-blue-600">{collaborateurs.length}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">
            {collaborateurs.filter(c => (c.statut || 'actif').toLowerCase() === 'actif').length}
          </div>
          <div className="text-sm text-gray-600">Actifs</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-red-600">
            {collaborateurs.filter(c => c.statut?.toLowerCase() === 'inactif').length}
          </div>
          <div className="text-sm text-gray-600">Inactifs</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
          <div className="text-sm text-gray-600">Catégories</div>
        </div>
      </div>

      {/* Enhanced filters and actions */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher par nom, CIN, téléphone..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
              <option value="en congé">En congé</option>
            </select>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {(searchText || statusFilter !== 'all' || categoryFilter !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Effacer les filtres
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleExportAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exporter tout
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter
            </button>
          </div>
        </div>
      </div>

      {/* Bulk actions */}
      <BulkActions
        selectedRows={selectedRows}
        onBulkDeactivate={handleBulkDeactivate}
        onBulkExport={handleBulkExport}
        onClearSelection={() => setSelectedRows([])}
      />

      {/* Enhanced DataTable */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <DataTable
          ref={tableRef}
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={25}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          highlightOnHover
          responsive
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={selectedRows.length === 0}
          customStyles={customStyles}
          noDataComponent={
            <div className="p-8 text-center">
              <div className="text-gray-400 text-lg mb-2">Aucun collaborateur trouvé</div>
              <div className="text-gray-500 text-sm">
                {searchText || statusFilter !== 'all' || categoryFilter !== 'all' 
                  ? 'Essayez de modifier vos critères de recherche'
                  : 'Commencez par ajouter des collaborateurs'
                }
              </div>
            </div>
          }
          progressComponent={
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          }
        />
      </div>

      {/* Results summary */}
      <div className="text-sm text-gray-600 text-center">
        Affichage de {filteredData.length} collaborateur(s) sur {collaborateurs.length} au total
      </div>

      <AddCollaborateurModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}