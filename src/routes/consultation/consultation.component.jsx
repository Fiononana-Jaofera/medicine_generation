import BasicTable from '../../components/table/table.component';
import Form from '../../components/form/form.component';

const Consultation = () => {
    const effects = ['e1', 'e2'];
    return (
        <div>
            <Form
                labels={effects}
                title={"Maladies"}
                button={{
                    color: 'success',
                    text: 'Consulter'
                }} />
            <h2>Résultat :</h2>
            <BasicTable
                headers={['Médicaments', 'Prix Unitaire', 'Quantité', 'Total']}
                body={[['m1', 100, 3, 300], ['m2', 100, 1, 100], ['', '', '', 400]]} />
        </div>
    );
}

export default Consultation