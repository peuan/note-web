import { API_URL } from "../configs";
import axios from "axios";

class Auth {
  url = `${API_URL}/auth`;

  async register(data) {
    try {
      const response = await axios.post(`${this.url}/register`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    try {
      const response = await axios.post(`${this.url}/login`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  setAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  removeAccessToken() {
    localStorage.removeItem("accessToken");
  }
  async getProfile() {
    try {
      const response = await axios.get(`${this.url}/profile`, {
        headers: { Authorization: `Bearer ${this.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      this.removeAccessToken();
      throw error;
    }
  }
}

export const AuthService = new Auth();
