const request = require("supertest");
const Mongoose = require("mongoose");
require("dotenv").config();
const app = require("../../index");

describe("Testing the validation for request payload", () => {

  // Run tests max time
  jest.setTimeout(10000);

  // before testing connect to mongo database
  beforeAll(() => {
    Mongoose.connect(process.env.DATABASE_URL);
  });

  

  

  test("Test request payload without minCount attribute, error code should be 400 Bad Request", async () => {
    await request(app)
      .post("/fetchRecordsByDateandCount")
      .send({
        startDate: "2016-02-26",
        endDate: "2017-03-10",
        maxCount: 1000,
      })
      .expect(400);
  });

  test("Test minCount is higher than maxCount, error code should be 400 Bad Request", async () => {
    await request(app)
      .post("/fetchRecordsByDateandCount")
      .send({
        startDate: "2016-02-26",
        endDate: "2017-03-10",
        minCount: 1000,
        maxCount: 998,
      })
      .expect(400);
  });

  test("Test startDate is later than endDate, error code should be 400 Bad Request", async () => {
    await request(app)
      .post("/fetchRecordsByDateandCount")
      .send({
        startDate: "2017-02-26",
        endDate: "2016-03-10",
        minCount: 900,
        maxCount: 998,
      })
      .expect(400);
  });

  test("Test invalid startDate format, error code should be 400 Bad Request", async () => {
    await request(app)
      .post("/fetchRecordsByDateandCount")
      .send({
        startDate: "dateiswrong",
        endDate: "2017-03-10",
        minCount: 2000,
        maxCount: 2700,
      })
      .expect(400);
  });


  // disconnect from database after all tests executed
  afterAll((done) => {
    Mongoose.disconnect(done);
    app.close();
  });
});