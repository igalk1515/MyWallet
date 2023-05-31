class Summary {
  constructor(db) {
    this.db = db;
  }

  async getByMonths(month) {
    const collection = this.db.getCollection('expense');
    const pipeline = [
      {
        $addFields: {
          convertedDate: {
            $dateFromString: {
              dateString: '$date',
            },
          },
        },
      },
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$convertedDate' }, month],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$price' },
          documents: { $push: '$$ROOT' }, // Add this stage to accumulate the documents
        },
      },
    ];
    const results = await collection.aggregate(pipeline).toArray();
    return results.length > 0 ? results[0] : null;
  }
}

module.exports = Summary;
