class Summary {
  constructor(db) {
    this.db = db;
  }

  async getByMonths(userId, month) {
    const collection = this.db.getCollection('expense');
    const pipeline = [
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $month: { $dateFromString: { dateString: '$date' } } },
                  month,
                ],
              },
              { $eq: ['$userId', userId] },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$price' },
          documents: { $push: '$$ROOT' },
        },
      },
    ];
    const results = await collection.aggregate(pipeline).toArray();
    return results.length > 0 ? results[0] : null;
  }
}

module.exports = Summary;
