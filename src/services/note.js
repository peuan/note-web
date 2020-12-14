import Axios from "axios";
import { API_URL } from "../configs";
import { AuthService } from "./auth";

class Note {
  url = `${API_URL}/notes`;

  async createNote(data) {
    try {
      const response = await Axios.post(`${this.url}`, data, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getNotes(
    query = { page: 1, limit: 10, noteView: "ALL", type: "NOTE" }
  ) {
    try {
      const page = `page=${query.page}`;
      const limit = `&limit=${query.limit}`;
      const noteView = `&noteView=${query.noteView}`;
      const type = `&type=${query.type}`;

      const response = await Axios.get(
        `${this.url}?${page}${limit}${noteView}${type}`,
        {
          headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
        }
      );
      return response.data.items;
    } catch (error) {
      throw error;
    }
  }
}

export const NoteService = new Note();
