const request = require("supertest");
const Mongoose = require("mongoose");
require("dotenv").config();
let app = require("../../index");

describe("Testing fetching records from database ", () => {

  // Run tests max time
  jest.setTimeout(10000);


  // before testing connect to mongo database
  beforeAll(() => {
    Mongoose.connect(process.env.DATABASE_URL);
  });



  test("Fetch data from database with correct inputs", async () => {
    await request(app).post("/fetchRecordsByDateandCount")
      .send({
        minCount: 2700,
        maxCount: 2800,
        startDate: '2016-02-26',
        endDate: '2017-02-02',
      })
      .expect(200)
      
  });


  // disconnect from database after all tests executed
  afterAll((done) => {
    Mongoose.disconnect(done);
    app.close();
  });
});