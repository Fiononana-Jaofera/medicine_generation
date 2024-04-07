import axios from 'axios';

class EffectDataService {
    getall(id) {
        if (id == undefined) {
            return axios.get("http://127.0.0.1:8000/api/effects/");
        }
        else {
            return axios.get(`http://127.0.0.1:8000/api/effects/${id}/`);
        }
    }
}

export default new EffectDataService;