const express = require("express");
const router = express.Router();

const validation = require("../middleware/validation");
const fetch = require("../controller/fetchRecords");
const record = require("../models/models");


// Post request for fetching records
router.route('/fetchRecordsByDateandCount').post(validation.recordValidation, fetch.fetchRecords);

module.exports = router;