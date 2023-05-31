import axios from 'axios'
export class BackendApi {
  constructor(url = 'http://localhost:8001') {
    this.api = axios.create({
      baseURL: url,
    })
  }
  async get(url) {
    const response = await this.api.get(url)
    return response.data
  }
  async post(url, data) {
    console.log('post', url, data)
    const response = await this.api.post(url, data)
    return response.data
  }
  async getSummary() {
    const response = await this.api.get('/summary')
    return response.data
  }
}
