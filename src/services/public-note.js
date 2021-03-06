import Axios from "axios";
import { API_URL } from "../configs";
import { AuthService } from "./auth";

class PublicNotes {
  url = `${API_URL}/public-notes`;

  async getPublicNote(query = { page: 1, limit: 10 }) {
    try {
      const page = `page=${query.page}`;
      const limit = `&limit=${query.limit}`;
      const response = await Axios.get(`${this.url}?${page}${limit}`, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateLike(noteId, data) {
    try {
      const response = await Axios.put(`${this.url}/${noteId}/like`, data, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getShowLikes(noteId) {
    try {
      const response = await Axios.get(`${this.url}/${noteId}/likes`, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async updateDislike(noteId, data) {
    try {
      const response = await Axios.put(
        `
        ${this.url}/${noteId}/dislike`,
        data,
        {
          headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUsersLike(noteId) {
    try {
      const response = await Axios.get(`${this.url}/${noteId}/likes`, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async getPublicNoteById(noteId) {
    try {
      const response = await Axios.get(`${this.url}/${noteId}`, {
        headers: { Authorization: `Bearer ${AuthService.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const PublicNotesService = new PublicNotes();
