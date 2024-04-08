import axios from 'axios';

class ConsultationDataService {
    postMaladie(data) {
        return axios.post(`http://127.0.0.1:8000/api/consultation/`, data);
    }
}

export default new ConsultationDataService;