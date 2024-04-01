import BasicTable from "../../components/table/table.component";
import Button from '@mui/material/Button';
import Form from "../../components/form/form.component";
const Effects = () => {
    const headers = ['Médicaments', 's1', 's2']
    const update_button = <Button variant='contained'>Modifier</Button>
    const delete_button = <Button variant='contained' color='error'>Supprimer</Button>
    const body = [
        ['m1', 1, 0, update_button, delete_button],
        ['m2', 2, 3, update_button, delete_button]
    ]
    return (
        <div style={{padding: '40px'}}>
            <h2>Les effets des médicaments sur chaque symptômes</h2>
            <BasicTable
                headers={headers}
                body={body} />
            <Form
                title="Médicaments"
                labels={['s1', 's2']}
                button={{
                    color: 'success',
                    text: 'Enregistrer'
                }} />
        </div>
    )
}

export default Effects;