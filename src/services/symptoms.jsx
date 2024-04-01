import axios from 'axios';

class SymptomDataService {
    getall() {
        return axios.get("http://127.0.0.1:8000/api/symptoms/");
    }
    createSymptom(data) {
        return axios.post("http://127.0.0.1:8000/api/symptoms/", data);
    }
    deleteSymptom(id) {
        return axios.delete(`http://127.0.0.1:8000/api/symptoms/${id}/`);
    }
    updateSymptom(id, data) {
        return axios.put(`http://127.0.0.1:8000/api/symptoms/${id}/`, data);
    }
}

export default new SymptomDataService;