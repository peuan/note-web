import axios from "axios";
import { API_URL } from "../configs";
import { AuthService } from "./auth";

class Tag {
  url = `${API_URL}/tags`;
  async createTag(data) {
    try {
      const response = await axios.post(`${this.url}`, data, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async getTags() {
    try {
      const response = await axios.get(`${this.url}`, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data.items;
    } catch (error) {
      throw error;
    }
  }
}
export const TagService = new Tag();
