const { MongoClient, ServerApiVersion } = require('mongodb')

class mongodb {
  constructor() {
    this.uri =
      'mongodb+srv://igal:asdf@wallet.oxq6vyx.mongodb.net/?retryWrites=true&w=majority'
    this.client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    })
  }
  async connect() {
    await this.client.connect()
  }
  async close() {
    await this.client.close()
  }
  async post(col, data) {
    const collection = this.client.db('Wallet').collection(col)
    await collection.insertOne(data)
  }
  async get(col) {
    return this.client.db('Wallet').collection(col)
  }
}

module.exports = mongodb
