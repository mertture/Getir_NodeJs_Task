
const record = require("../models/models");

module.exports = {
    fetchRecords: async (req, res) => {
        
        try {
            // Query in Mongo
            var records = await record.aggregate([
                // Filter between start-end date before calculating count
                {
                  $match: {
                    createdAt: {
                      $gte: (req.body.startDate),
                      $lte: (req.body.endDate),
                    },
                  },
                },
                // Create totalCount attribute by summing count array
                {
                  $addFields: {
                    totalCount: { $sum: "$counts" },
                  },
                },
        
                // Filter totalCount between min-max Count
                {
                  $match: {
                    totalCount: {
                      $gte: req.body.minCount,
                      $lte: req.body.maxCount,
                    },
                  },
                },
        
        
                 // Define response payload attributes
                 {
                    $project: {
                      _id: 0,
                      key: 1,
                      createdAt: 1,
                      totalCount: 1,
                    },
                  },
               
              ]);
              return res.status(200).send({ code: 0, msg: "Success", records });
            }
            catch (err) {
              // error about database
              return res.status(err.httpStatus).send({ code: 2, msg: err.message});

            }
    }
}

