import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddKirja(props) {
    const [open, setOpen] = useState(false);
    const [kirja, setKirja] = useState({author: '', isbn: '', price: '', title: '', year: ''});

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setKirja({...kirja, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.addKirja(kirja);
        handleClose();
    }

    return(
      <>
        <Button variant="outlined" onClick={handleOpen} style={{margin: 10}}>
            Lisää kirja
        </Button>
        <Dialog open={open}> 
            <DialogTitle>Uusi kirja</DialogTitle>
            <DialogContent>
                <TextField
                    name="title"
                    value={kirja.title}
                    onChange={inputChanged}
                    margin="dense"
                    label="Otsikko"
                    fullWidth
                />
                <TextField
                    name="author"
                    value={kirja.author}
                    onChange={inputChanged}
                    margin="dense"
                    label="Kirjailija"
                    fullWidth
                />
                <TextField
                    name="year"
                    value={kirja.year}
                    onChange={inputChanged}
                    margin="dense"
                    label="Vuosi"
                    fullWidth
                />
                <TextField
                    name="isbn"
                    value={kirja.isbn}
                    onChange={inputChanged}
                    margin="dense"
                    label="ISBN"
                    fullWidth
                />
                <TextField
                    name="price"
                    value={kirja.price}
                    onChange={inputChanged}
                    margin="dense"
                    label="Hinta"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>Peru</Button>
                <Button color="primary" onClick={handleSave}>Tallenna</Button>
            </DialogActions>
        </Dialog> 
      
      </>
    );
  }
  
  export default AddKirja;