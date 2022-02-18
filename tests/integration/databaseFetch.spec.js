const request = require("supertest");
const Mongoose = require("mongoose");
require("dotenv").config();
let app = require("../../index");

describe("Testing fetching records from database ", () => {

  // Run tests max time
  jest.setTimeout(15000);


  // before testing connect to mongo database
  beforeAll(() => {
    Mongoose.connect(process.env.DATABASE_URL);
  });



  test("Fetch data from database with correct inputs and http status code 200 OK", async () => {
    const res = await request(app).post("/fetchRecordsByDateandCount")
      .send({
        minCount: 2699,
        maxCount: 2700,
        startDate: '2016-02-26',
        endDate: '2018-04-02',
      })
      .expect(200)
      await expect(res.body)
        .toEqual({
          code: 0,
          msg: "Success",
          records: [],
      })
  });



  test("Fetch data from database with correct inputs and http status code 200 OK", async () => {
    const res = await request(app).post("/fetchRecordsByDateandCount")
      .send({
        minCount: 2700,
        maxCount: 2800,
        startDate: '2016-02-26',
        endDate: '2016-04-02',
      })
      .expect(200)
      await expect(res.body)
        .toEqual({
          code: 0,
          msg: "Success",
          records: [
              {
                  key: "xwqjExMK",
                  createdAt: "2016-03-27T09:36:31.788Z",
                  totalCount: 2783
              },
              {
                  key: "vZZOIiPi",
                  createdAt: "2016-03-02T09:30:26.664Z",
                  totalCount: 2701
              },
              {
                  key: "UlDFSFPv",
                  createdAt: "2016-03-02T09:30:11.209Z",
                  totalCount: 2735
              },
              {
                  key: "dcJUSDLR",
                  createdAt: "2016-02-27T16:12:30.813Z",
                  totalCount: 2780
              }
          ]
      })
  });

  


  // disconnect from database after all tests executed
  afterAll((done) => {
    Mongoose.disconnect(done);
    app.close();
  });
});