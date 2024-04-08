import { Button } from "@mui/material";

import BasicTable from '../../components/table/table.component';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react';

import SymptomDataService from '../../services/symptoms';
import ConsultationDataService from '../../services/consultation';

const Consultation = () => {
    const [symptoms, setSymptoms] = React.useState([]);
    const [formData, setFormData] = React.useState([]);
    const [getResult, setGetResult] = React.useState([]);
    const [displayTable, setDisplayTable] = React.useState(false);
    const headers = ['Médicaments', 'Prix Unitaire', 'Quantité', 'Total'];

    React.useEffect(() => {
        SymptomDataService.getall()
            .then(res => setSymptoms(res.data))
            .catch(e => console.log(e));
    }, [])

    React.useEffect(() => {
        let temp = []
        symptoms.forEach(s => {
            temp.push({ "id": s.id, 'maladie': s.name, 'degre': 0 });
        })
        setFormData(temp);
    }, [symptoms]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        ConsultationDataService.postMaladie(formData)
            .then(res => {
                let data = res.data;
                let temp = [];
                let total = 0;
                data.forEach(d => {
                    total = total + (d.price * d.count);
                    temp.push([d.medicine, d.price, d.count, (d.price * d.count)]);
                })
                temp.push(['', '', 'Prix total', total]);
                setGetResult(temp);
                setDisplayTable(true);
            })
            .catch(e => console.log(e));
    }

    const handleOnChange = (e, name) => {
        const value = Number(e.target.value);
        let temp = [];
        formData.forEach(f => {
            if (name == f.maladie) {
                temp.push({ "id": f.id, 'maladie': f.maladie, 'degre': value });
            }
            else {
                temp.push({ "id": f.id, 'maladie': f.maladie, 'degre': f.degre });
            }
        })
        setFormData(temp);
    }


    return (
        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h4>Maladies :</h4>
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

                {symptoms.map((s, id_s) => <TextField
                    key={id_s}
                    id="outlined-basic"
                    type="number"
                    inputProps={{ min: 0 }}
                    label={s.name}
                    onChange={(e) => handleOnChange(e, s.name)}
                    name={s.name}
                    variant="outlined"
                    size="small"
                    sx={{width: '100px'}}
                    required />)}
            </Box>
            <Button variant='contained' type='submit' color="success" onClick={handleOnSubmit}>Consulter</Button>
            {displayTable ? (
                <BasicTable
                    title={"Résultats :"}
                    headers={headers}
                    body={getResult} />) : ""}
        </div>
    );
}

export default Consultation