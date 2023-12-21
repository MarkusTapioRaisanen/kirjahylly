import { useState, useEffect } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddKirja from './components/AddKirja';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [kirjat, setKirjat] = useState([]);

  const columnDefs = [
    { headerName: 'Otsikko', field: 'title', sortable: true, filter: true},
    { headerName: 'Kirjailija', field: 'author', sortable: true, filter: true},
    { headerName: 'Vuosi', field: 'year', sortable: true, filter: true},
    { headerName: 'ISBN', field: 'isbn', sortable: true, filter: true},
    { headerName: 'Hinta', field: 'price', sortable: true, filter: true},
    { 
      headerName: '',
      field: 'id',
      width: 90,
      cellRenderer: params => 
      <IconButton onClick={() => deleteKirja(params.value)} size="small" color="error">
        <DeleteIcon />
      </IconButton> 
    }
  ]

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = () => {
    fetch('https://kirjahylly-2f046-default-rtdb.europe-west1.firebasedatabase.app/books/.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
    Object.defineProperty(item, 'id', {value: keys[index]}));
    setKirjat(valueKeys);
  }

  const addKirja = (newKirja) => {
    fetch('https://kirjahylly-2f046-default-rtdb.europe-west1.firebasedatabase.app/books/.json',
    {
      method: 'POST',
      body: JSON.stringify(newKirja)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const deleteKirja = (id) => {
    fetch(`https://kirjahylly-2f046-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
    {
      method: 'DELETE',
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">
            Kirjahylly
          </Typography>
        </Toolbar>
      </AppBar> 
      <AddKirja addKirja={addKirja}/>
      <div className="ag-theme-material" style={{ height: 400, width: 1100 }}>
        <AgGridReact 
          rowData={kirjat}
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
}

export default App;