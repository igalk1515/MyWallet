class Summary {
  constructor(db) {
    this.db = db
  }
  getByMonths(data) {
    this.db.get('expense')
  }
}

module.exports = Summary
