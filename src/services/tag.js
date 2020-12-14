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
  async getTags(query = { page: 1, limit: 10, search: "" }) {
    try {
      const page = `page=${query.page}`;
      const limit = `&limit=${query.limit}`;
      const search = query.search ? `&search=${query.search}` : ``;
      const response = await axios.get(`${this.url}?${page}${limit}${search}`, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data.items;
    } catch (error) {
      throw error;
    }
  }
  async deleteTag(tagId) {
    try {
      const response = await axios.delete(`${this.url}/${tagId}`, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export const TagService = new Tag();
