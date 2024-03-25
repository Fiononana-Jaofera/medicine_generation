import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Form = ({labels, title, button, type="number"}) => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h2>{title}</h2>
            {labels.map((e, id) => <TextField
                id="outlined-basic"
                type={type}
                key={id}
                label={e}
                variant="outlined" />)}
            <Button variant='contained' type='submit' color={button.color}>{button.text}</Button>
        </Box>
    )
}

export default Form;