import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import Form from "../../components/form/form.component";

export default function Symptoms() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const symptoms = ['s1', 's2']
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 200 }}>
      <Grid item xs={12} md={6}>
        <List dense={dense}>

          {symptoms.map((e, idx) => <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
            key={idx}
          >
            <ListItemText
              primary={e}
              secondary={secondary ? 'Secondary text' : null}
            />
          </ListItem>)}
          <Button variant="contained" >Ajouter</Button>
          <Form
                labels={["Nom du symptôme"]}
                button={{
                    color: "success",
                    text: "Enregistrer"
                }}
                type='text' />
        </List>
      </Grid>
    </Box>
  );
}
