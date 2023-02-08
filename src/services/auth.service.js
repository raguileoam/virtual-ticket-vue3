import axios from "axios";
import API_URL from "./api.config";

const AUTH_URL = API_URL;

class AuthService {
  login(user) {
    return axios
      .post(
        `${AUTH_URL}/login?username=${user.email}&password=${user.password}`
      )
      .then(
        (response) => {
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            return {
              username: response.data.user.username,
              token: response.data.token,
              authorities: response.data.user.authorities,
            };
          }
          return null;
        },
        (error) => {
          if (error.response.status === 401) {
            this.logout();
            return Promise.reject(error.response.data.mensaje);
          }
          return Promise.reject("Error desconocido");
        }
      );
  }

  logout() {
    localStorage.removeItem("token");
  }
}

export default new AuthService();
