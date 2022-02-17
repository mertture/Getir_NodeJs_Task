const express = require("express");
const router = express.Router();

const validation = require("../middleware/validation");
const record = require("../models/models");

router.post('/fetchRecordsByDateandCount', async (req, res) => {
  console.log(req.body);
    try {
    var records = await record.aggregate([
        // Filter before adding total count param to reduce time and effort for fetch process
        {
          $match: {
            createdAt: {
              $gte: (req.body.startDate),
              $lte: (req.body.endDate),
            },
          },
        },
        // Add totalCount field to response payload
        {
          $addFields: {
            totalCount: { $sum: "$counts" },
          },
        },

        // Query for totalCount property
        {
          $match: {
            totalCount: {
              $gte: req.body.minCount,
              $lte: req.body.maxCount,
            },
          },
        },


         // Prepare the payload for requested format
         {
            $project: {
              _id: 0,
              key: 1,
              createdAt: 1,
              totalCount: 1,
            },
          },
       
      ]);
      return res.status(200).json({ code: 0, msg: "Success", records });
    }
    catch (err) {
        res.status(err.httpStatus).json({ code: 2, msg: err.message});
    }

})

module.exports = router;