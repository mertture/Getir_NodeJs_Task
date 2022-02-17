const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


const database = require("./database/database")();

const recordsRouter = require("./routes/recordRoutes");

app.use(bodyParser.json());
app.use(cors ({origin: "*", methods: "*"}));

app.use("/", recordsRouter);

app.use("/fetchRecordsByDateandCount", recordsRouter)

app.use("", (req, res) => {
    // Right route but GET request err
    if (req.url === "/fetchRecordsByDateandCount" && req.method !== "POST") {
        res.status(405).send({ code: 2, msg: "Only post requests are allowed"});
    }
    // Wrong route
    else {
        res.status(404).send({code: 3, msg: "Route not found"});
    }
})
    



app.listen(process.env.PORT, () => console.log(`Server is running on port number ${process.env.PORT}`))
