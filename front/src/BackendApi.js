import axios from 'axios';
export class BackendApi {
  constructor() {
    const url = process.env.REACT_APP_API_URL;
    this.api = axios.create({
      baseURL: url,
    });
  }
  async get(url, body) {
    const response = await this.api.get(url, {
      params: body,
      withCredentials: true,
    });
    return response.data;
  }
  async post(url, data) {
    const response = await this.api.post(url, data, { withCredentials: true });
    return response.data;
  }
  async getSummary(month) {
    const response = await this.api.get('/summary', {
      params: {
        month: month.toString(),
      },
      withCredentials: true,
    });
    return response.data;
  }

  async deleteExpense(id) {
    const response = await this.api.delete('/expense', {
      params: {
        id,
      },
      withCredentials: true,
    });
    return response.data;
  }
}
