const request = require("supertest");
const Mongoose = require("mongoose");
require("dotenv").config();

const app = require("../../index");

describe("Testing the /fetchRecordsByDateandCount route", () => {

  jest.setTimeout(10000);
  // before testing connect to mongo database
  beforeAll(() => {
    Mongoose.connect(process.env.DATABASE_URL);
  });

  test("Undefined route get request should give 404 not found error", async () => {
    await request(app).get("/route-undefined").expect(404);
  });

  test("Undefined route post request should give 404 not found error", async () => {
    await request(app).post("/undefined-route").expect(404);
  });

  test("Defined route but get request should give 405 Method not allowed", async () => {
    await request(app).get("/fetchRecordsByDateandCount").expect(405);
  });


  // after testing should disconnect from database
  afterAll((done) => {
    Mongoose.disconnect(done);
  });
});