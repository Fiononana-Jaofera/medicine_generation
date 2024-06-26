import axios from 'axios';

class MedicineDataService {
    getall() {
        return axios.get("http://127.0.0.1:8000/api/medicines/");
    }
    createMedicine(data) {
        return axios.post("http://127.0.0.1:8000/api/medicines/", data);
    }
    deleteMedicine(id) {
        return axios.delete(`http://127.0.0.1:8000/api/medicines/${id}/`)
    }
    updateMedicine(id, data) {
        return axios.put(`http://127.0.0.1:8000/api/medicines/${id}/`, data)
    }
}

export default new MedicineDataService;