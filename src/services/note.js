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

  async getNotes() {
    try {
      const response = await Axios.get(`${this.url}`, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(noteId) {
    try {
      const response = await Axios.delete(`${this.url}/${noteId}`, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const NoteService = new Note();
