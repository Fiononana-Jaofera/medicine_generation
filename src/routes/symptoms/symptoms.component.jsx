import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import SymptomDataService from "../../services/symptoms";
import TextField from '@mui/material/TextField';

export default function Symptoms() {
  const [symptoms, setSymptoms] = React.useState([]);
  const [name, setName] = React.useState("");
  const [isAdd, setIsAdd] = React.useState(false)

  React.useEffect(() => {
    SymptomDataService.getall().then(res => {
      setSymptoms(res.data)
    }).catch(e => {
      console.log(e)
    });
  }, [])

  const handleSubmit = () => {
    SymptomDataService.createSymptom({
      "name": name,
    }).then(() => setIsAdd(!isAdd)).catch(e => console.log(e));
  }

  const handleDelete = (id) => {
    SymptomDataService.deleteSymptom(id).then(() => {
      SymptomDataService.getall().then(res => {
        setSymptoms(res.data)
      }).catch(e => {
        console.log(e)
      });
    })
  }

  const onChangeName = e => {
    const name = e.target.value;
    setName(name)
  }


  return (
    <Box style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
      <List>
        <h4 style={{textAlign: 'center'}}>Liste des symptômes :</h4>
        {symptoms.map((e, idx) => <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(e.name)}>
              <DeleteIcon />
            </IconButton>
          }
          key={idx}
        >
          <ListItemText
            primary={e.name}
            sx={{minWidth: '100px'}}
          />
        </ListItem>)}
      </List>
      {isAdd ? <Box
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
        <h4>Nouvelle symptôme :</h4>
        <TextField
          id="outlined-basic"
          type="text"
          label="Nom"
          onChange={onChangeName}
          value={name}
          name="name"
          variant="outlined"
          required />
        <Button variant='contained' type='submit' color="success" onClick={handleSubmit}>Enregistrer</Button>
      </Box> : <Button variant="contained" onClick={() => setIsAdd(!isAdd)}>Ajouter</Button>}
    </Box>
  );
}
