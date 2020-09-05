const projectData = {};
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("website"));
const port = 8000;
const server = app.listen(port, () => {
    console.log(`running on localhost:${port}`);
});
/* ROUTES */
app.get("/weather", (req, res) => {
    res.send(projectData);
});
app.post("/weather", (req, res) => {
    console.log(req.body);
    projectData["temp"] = req.body.temp;
    projectData["date"] = req.body.date;
    projectData["userResponse"] = req.body.userResponse;
    res.send(projectData);
});