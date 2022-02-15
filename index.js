const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 3000;

const database = require("./database/database")();

const recordsRouter = require("./routes/recordRoutes");

app.use(bodyParser.json());


app.use("/", recordsRouter);

app.use("/fetchRecordsByDateandCount", recordsRouter);

app.use("", (req, res) => {
    if (req.url === "/fetchRecordsByDateandCount" && req.method !== "POST") {
        res.status(405).send("Only post requests are allowed");
    }
    else {
        res.status(404).send("Route not found");
    }
})
    



app.listen(port, () => console.log(`Server is running on port number ${port}`))
