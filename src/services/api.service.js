import axios from "axios";
import API_URL from "./api.config";
let api = axios.create({ baseURL: API_URL });

const apiService = {
    setHeader() {
        const token = localStorage.getItem("token");
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    handlingError(error) {
        if (!error.response) {
            throw new Error(`Error: No hay conexión a internet`);
        } else if (error.response.status == 418) {
            throw new Error(`Error: ${error.response.data.message}`);
        } else if (error.response.status == 403) {
            localStorage.removeItem("user");
            location.reload();
        } else {
            throw new Error(`Error desconocido: ${error.response.status}`);
        }
    },
    post(route, { params = " ", slug = "" }) {
        this.setHeader();
        return api.post(`${route}/${slug}`, params).catch((error) => {
            this.handlingError(error);
        });
    },
    update(route, { params = " ", slug = "" }, config = {}) {
        this.setHeader();
        return api.put(`${route}/${slug}`, params, config).catch((error) => {
            this.handlingError(error);
        });
    },
    get(route, slug = "", config = {}) {
        this.setHeader();
        return api.get(`${route}/${slug}`, config).catch((error) => {
            this.handlingError(error);
        });
    },
    delete(route, slug = "") {
        this.setHeader();
        return api.delete(`${route}/${slug}`).catch((error) => {
            this.handlingError(error);
        });
    },
};
export default apiService;