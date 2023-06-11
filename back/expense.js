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

  async deleteOne(id) {
    await this.db.deleteOne('expense', id);
  }
}

module.exports = Expense;
