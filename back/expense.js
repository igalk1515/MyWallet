class Expense {
  constructor(db) {
    this.db = db;
  }
  insertOne(data) {
    this.db.post('expense', data);
  }
  updateOne(data) {
    this.db.updateOne('expense', data);
  }
}

module.exports = Expense;
