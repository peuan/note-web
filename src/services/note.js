import Axios from "axios";
import { API_URL } from "../configs";

class Note {
  async getnotes(data) {
    try {
      const response = await Axios.post(`${this.url}/notes`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const NoteService = new Note();
