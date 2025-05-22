import React from 'react';
import DataTable from 'react-data-table-component';
import { useCollaborateurs } from '../../contexts/CollaborateursContext';

export default function CollaborateursTable() {
  const { collaborateurs, loadingCols, errorCols } = useCollaborateurs();

  const columns = [
    { name: 'ID',       selector: row => row.idco,   sortable: true, width: '80px' },
    { name: 'Nom',      selector: row => row.nom,    sortable: true },
    { name: 'Prénom',   selector: row => row.prenom, sortable: true },
    { name: 'CIN',      selector: row => row.cin,    sortable: true },
    { name: 'Sexe',     selector: row => row.sexe,   sortable: true },
    { name: 'Date Nais.','selector': row => row.daten, sortable: true },
    { name: 'Ville',    selector: row => row.ville,  sortable: true },
    { name: 'Tel',      selector: row => row.numtel, sortable: true },
    // add more columns as needed…
  ];

  if (loadingCols)  return <div>Loading collaborateurs…</div>;
  if (errorCols)    return <div>Error: {JSON.stringify(errorCols)}</div>;

  return (
    <DataTable
      title="Collaborateurs"
      columns={columns}
      data={collaborateurs}
      pagination
      highlightOnHover
      responsive
    />
  );
}
