const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const connectionString = process.env.MONGODB_CONNECTION_STRING;

class mongodb {
  constructor() {
    this.uri = connectionString;
    this.client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
  }
  async connect() {
    await this.client.connect();
  }
  async close() {
    await this.client.close();
  }
  async post(col, data) {
    const collection = this.client.db('Wallet').collection(col);
    await collection.insertOne(data);
  }
  getCollection(col) {
    return this.client.db('Wallet').collection(col);
  }
}

module.exports = mongodb;
