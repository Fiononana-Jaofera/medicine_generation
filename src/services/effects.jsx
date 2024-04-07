import axios from 'axios';

class EffectDataService {
    getall() {
        return axios.get("http://127.0.0.1:8000/api/effects/");
    }
}

export default new EffectDataService;