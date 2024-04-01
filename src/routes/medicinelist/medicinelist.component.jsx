import React, { useState } from 'react';
import { Button } from "@mui/material";
import MedicineDataService from '../../services/medicines';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const MedicineList = () => {
    const [medicines, setMedicines] = React.useState([]);
    const [isAdd, setIsAdd] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const headers = ['Médicaments', 'Prix'];
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [id, setId] = React.useState(0);

    React.useEffect(() => {
        MedicineDataService.getall().then(res => {
            setMedicines(res.data)
        }).catch(e => {
            console.log(e)
        });
    }, [])

    const handleSubmit = () => {
        if (isAdd) {
            MedicineDataService.createMedicine({
                "name": name,
                "price": price,
            }).then(res => setIsAdd(!isAdd)).catch(e => console.log(e));
        }
        else if (isUpdate) {
            MedicineDataService.updateMedicine(id, {
                "name": name,
                "price": price,
            }).then(res => {
                setIsUpdate(!isUpdate);
            }).catch(e => console.log(e));
        }
    }

    const handleDelete = (id) => {
        MedicineDataService.deleteMedicine(id).then(() => {
            MedicineDataService.getall().then(res => {
                setMedicines(res.data)
            }).catch(e => {
                console.log(e)
            });
        })
    }

    const onChangeName = e => {
        const name = e.target.value;
        setName(name)
    }

    const onChangePrice = e => {
        const price = e.target.value;
        setPrice(price)
    }

    const handleRowClick = (row) => {
        setId(row.id)
        setName(row.name);
        setPrice(row.price);
        setIsUpdate(!isUpdate);
    }

    return (
        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>

            <TableContainer component={Paper} style={{ width: '70%' }}>
                <h4 style={{ textAlign: 'center' }}>Liste des médicaments</h4>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header, id_h) => <TableCell sx={{ fontWeight: 'bold' }} key={id_h}>{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicines.map((row, id_r) => (
                            <TableRow
                                key={id_r}
                                sx={{ ":hover": { backgroundColor: "#e0e0e0" }, cursor: "pointer" }}
                            >
                                <TableCell onClick={() => handleRowClick(row)}>{row.name}</TableCell>
                                <TableCell onClick={() => handleRowClick(row)}>{row.price}</TableCell>
                                <TableCell>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isAdd || isUpdate ? <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                }}
            >
                <h4>Nouveau médicament :</h4>
                <TextField
                    id="outlined-basic"
                    type="text"
                    label="Nom"
                    onChange={onChangeName}
                    value={name}
                    name="name"
                    variant="outlined"
                    required />
                <TextField
                    id="outlined-basic"
                    type="number"
                    label="Prix"
                    name="price"
                    onChange={onChangePrice}
                    value={price}
                    variant="outlined" />
                <Button variant='contained' type='submit' color="success" onClick={handleSubmit}>Enregistrer</Button>
            </Box> : <Button variant="contained" onClick={() => setIsAdd(!isAdd)}>Ajouter</Button>}

        </div>
    )
}

export default MedicineList;