import BasicTable from "../../components/table/table.component";
import { Button } from "@mui/material";
import Form from "../../components/form/form.component";

const MedicineList = () => {
    const headers = ['Médicaments', 'Prix']
    const delete_button = <Button variant="contained" color="error" >Supprimer</Button>
    const body = [
        ['m1', 20, delete_button],
        ['m2', 30, delete_button]
    ]
    return (
        <div>
            <h2>Liste des médicaments</h2>
            <BasicTable
                headers={headers}
                body={body} />
            <Button variant="contained" >Ajouter</Button>
            <Form
                title={"Ajouter médicament"}
                labels={headers}
                button={{
                    color: "success",
                    text: "Enregistrer"
                }} />
        </div>
    )
}

export default MedicineList;