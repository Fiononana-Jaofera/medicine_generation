import Button from '@mui/material/Button';
import Form from "../../components/form/form.component";
import React from "react";
import EffectDataServices from "./../../services/effects";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Effects = () => {
    const [effects, setEffects] = React.useState([]);
    const [headers, setHeaders] = React.useState([]);
    const [medicines, setMedicines] = React.useState([]);
    const [symptoms, setSymptoms] = React.useState([]);

    React.useEffect(() => {
        EffectDataServices.getall().then(res => {
            setEffects(res.data);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    React.useEffect(() => {
        const allMedicines = effects.map(e => e.medicine_id);
        const uniqueMedicines = [...new Set(allMedicines)];
        setMedicines(uniqueMedicines.reverse());

        const allSymptoms = effects.map(e => e.symptom_id);
        const uniqueSymptoms = [...new Set(allSymptoms)];
        setSymptoms(uniqueSymptoms.reverse());

        setHeaders(["Médicaments"].concat(symptoms));
    }, [effects]);

    return (
        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
            <TableContainer component={Paper} style={{ width: '70%' }}>
                <h4 style={{ textAlign: 'center' }}>Les effets des médicaments sur chaque symptômes</h4>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header, id_h) => <TableCell sx={{ fontWeight: 'bold' }} key={id_h}>{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {effects.map((row, id_r) => (
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
            {/* <Form
                title="Médicaments"
                labels={['s1', 's2']}
                button={{
                    color: 'success',
                    text: 'Enregistrer'
                }} /> */}
        </div>
    )
}

export default Effects;