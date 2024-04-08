import Button from '@mui/material/Button';
import React, { Fragment } from "react";
import EffectDataServices from "./../../services/effects";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Effects = () => {
    const [effects, setEffects] = React.useState([]);
    const [headers, setHeaders] = React.useState([]);
    const [medicines, setMedicines] = React.useState([]);
    const [medicine, setMedicine] = React.useState("");
    const [symptoms, setSymptoms] = React.useState([]);
    const [isUpdate, setIsUpdated] = React.useState(false);
    const [formData, setFormData] = React.useState([]);

    const findEffectByMedicineAndSymptom = (medicine, symptom) => {
        return effects.find(obj => obj.medicine_id == medicine && obj.symptom_id == symptom)['effect'];
    }

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
        setMedicines(uniqueMedicines);

        const allSymptoms = effects.map(e => e.symptom_id);
        const uniqueSymptoms = [...new Set(allSymptoms)];
        setSymptoms(uniqueSymptoms);

        setHeaders(["Médicaments"].concat(symptoms));
    }, [effects]);

    const handleRowClick = (id) => {
        setIsUpdated(true);
        setMedicine(id);
        EffectDataServices.getall(id).then(res => setFormData(res.data)).catch(e => console.log(e));
    }

    const handleOnSubmit = () => {
        EffectDataServices.updateEffect(formData)
        .then(() => {
            setIsUpdated(false);
            location.reload();
        })
        .catch(e => console.log(e))
    }

    const handleOnChange = (e, id) => {
        const value = Number(e.target.value);
        let temp = [];
        formData.forEach(f => {
            if (id == f.id) {
                temp.push({ 'id': f.id, 'medicine_id': f.medicine_id, 'symptom_id': f.symptom_id, 'effect': value });
            }
            else {
                temp.push({ 'id': f.id, 'medicine_id': f.medicine_id, 'symptom_id': f.symptom_id, 'effect': f.effect });
            }
        })
        setFormData(temp);
    }

    return (
        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <TableContainer component={Paper} style={{ width: '70%' }}>
                <h4 style={{ textAlign: 'center' }}>Les effets des médicaments sur chaque symptômes</h4>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header, id_h) => <TableCell sx={{ fontWeight: 'bold' }} key={id_h}>{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicines.map((m, id_r) => (
                            <TableRow
                                key={id_r}
                                sx={{ ":hover": { backgroundColor: "#e0e0e0" }, cursor: "pointer" }}
                                onClick={() => handleRowClick(m)}
                            >
                                <TableCell>{m}</TableCell>
                                {symptoms.map((s, id_c) => (
                                    <TableCell key={id_c}>
                                        {findEffectByMedicineAndSymptom(m, s)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isUpdate ?
                <Fragment>
                    <h4>{medicine}</h4>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '40px'
                        }}
                    >
                        {formData.map((f) => (
                            <TextField
                                key={f.id}
                                id="outlined-basic"
                                type="number"
                                label={f.symptom_id}
                                onChange={(e) => handleOnChange(e, f.id)}
                                value={f.effect}
                                name={f.symptom_id}
                                variant="outlined"
                                inputProps={{ min: 0 }}
                                size="small"
                                sx={{ width: '100px' }}
                                required />
                        ))}
                    </Box>
                    <span style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        <Button variant='contained' type='submit' color="success" onClick={handleOnSubmit}>Enregistrer</Button>
                        <Button variant='contained' type='reset' color="error" onClick={() => {
                            setIsUpdated(false);
                            setMedicine("");
                        }}>Annuler</Button>
                    </span>
                </Fragment>
                : ""}
        </div>
    )
}

export default Effects;