import axios from 'axios';
export class BackendApi {
  constructor() {
    const url = process.env.REACT_APP_API_URL;
    console.log(url);
    this.api = axios.create({
      baseURL: url,
    });
  }
  async get(url) {
    const response = await this.api.get(url, { withCredentials: true });
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
}
