const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8000;
const mongoose = require("mongoose");
const { mongoConfig } = require("./DB/config");
const { saveFilm, findFilmByID, findAllFilms, updateFilm, deleteFilm } = require("./DB/database");


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => res.send("Home page"));

app.post("/film", async (req, res) => {
    console.log("Body: ", req.body);
    res.send("shto nibud");
    await saveFilm(req.body);
});

app.get("/film/:id", async (req, res) => {
    const id = req.params.id;
    const foundFilm = await findFilmByID(id);
    res.send(foundFilm);
});

app.get("/films", async (req, res) => {
    const foundFilm = await findAllFilms();
    res.send(foundFilm);
});

app.patch("/film", async (req, res) => {
    const body = req.body;
    const id = body.id;
    const updatedFields = {...body};
    delete updatedFields.id;
    await updateFilm(id, updatedFields);
    res.send("Updated successfully.");
});

app.delete("/film/:id", async (req, res) => {
    const id = req.params.id;
    await deleteFilm(id);
    res.send("Deleted successfully.");
});

mongoose.connect(mongoConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to mongoDB");
});

mongoose.connection.on("error", err => {
    console.log("Not connected to mongoDB", err);
});