class Expense {
  constructor(db) {
    this.db = db
  }
  insertOne(data) {
    this.db.post('expense', data)
  }
}

module.exports = Expense
