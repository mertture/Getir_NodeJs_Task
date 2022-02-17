const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


const database = require("./database/database")();

const recordsRouter = require("./routes/recordRoutes");

const jsonParser = (bodyParser.json());
app.use(cors ({origin: "*", methods: "*"}));

app.use("/", recordsRouter);

app.use("/fetchRecordsByDateandCount", jsonParser, recordsRouter);

app.use("", (req, res) => {
    // Right route but GET request err
    if (req.url === "/fetchRecordsByDateandCount" && req.method !== "POST") {
        res.status(405).send("Only post requests are allowed");
    }
    // Wrong route
    else {
        res.status(404).send("Route not found");
    }
})
    



app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port number ${process.env.PORT || 5000}`))
