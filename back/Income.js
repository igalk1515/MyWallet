class Income {
  constructor(db) {
    this.db = db;
  }
  insertOne(data) {
    this.db.post('income', data);
  }
}

module.exports = Income;
