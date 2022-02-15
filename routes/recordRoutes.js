const express = require("express");
const router = express.Router();



const record = require("../models/models");

router.post('/fetchRecordsByDateandCount', async (req, res) => {

    try {
    var records = await record.aggregate([
        // Filter before adding total count param to reduce time and effort for fetch process
        {
          $match: {
            createdAt: {
              $gte: new Date(req.body.startDate),
              $lte: new Date(req.body.endDate),
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
        console.log(err);
        res.status(400).send(err);
    }

})

router.post("/", (req,res) => {
    console.log("abc");
    res.status(200).send("it works");
})


module.exports = router;