import Axios from "axios";
import { API_URL } from "../configs";
import { AuthService } from "./auth";

class notification {
  url = `${API_URL}/notifications`;

  async getNotifications(query = { page: 1, limit: 10 }) {
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

  async updateNotification(notificationId, data) {
    try {
      const response = await Axios.put(
        `${this.url}/${notificationId}/read`,
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
}
export const NotificationService = new notification();
