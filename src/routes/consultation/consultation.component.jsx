import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicTable from '../../components/table/table.component';
import Button from '@mui/material/Button';

const Consultation = () => {
    const effects = ['e1', 'e2'];
    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <h2>Maladies :</h2>
                {effects.map((e, id) => <TextField
                    id="outlined-basic"
                    type="number"
                    key={id}
                    label={e}
                    variant="outlined" />)}
                <Button variant='contained' type='submit' color='success'>Consulter</Button>
                
            </Box>
            <h2>Résultat :</h2>
            <BasicTable
                headers={['Médicaments', 'Prix Unitaire', 'Quantité', 'Total']}
                body={[['m1', 100, 3, 300],['m2', 100, 1, 100], ['','','', 400]]} />
        </div>
    );
}

export default Consultation