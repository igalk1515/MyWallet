const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

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
  async addUser(userName, password, id) {
    const collection = this.client.db('Wallet').collection('users');
    const hash = await bcrypt.hash(password, 10);
    const response = await collection.insertOne({
      userName,
      password: hash,
      _id: id,
    });
    return response;
  }
  async getUser(userName) {
    const collection = this.client.db('Wallet').collection('users');
    const user = await collection.findOne({ userName });
    return user;
  }

  async updateOne(col, data) {
    const { _id, ...updateData } = data;
    const id = new ObjectId(_id);
    const collection = this.client.db('Wallet').collection(col);
    await collection.updateOne({ _id: id }, { $set: updateData });
  }

  async deleteOne(col, id) {
    const collection = this.client.db('Wallet').collection(col);
    await collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = mongodb;
