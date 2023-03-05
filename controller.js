const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8000;
const { saveFilm, findFilmByID, findAllFilms, updateFilm, deleteFilm, dbSetUp } = require("./DB/database");


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbSetUp();
});

app.get("/", (req, res) => res.send("Home page"));

app.post("/film", (req, res) => {
    saveFilm(req.body)
        .then(() => {
            res.send("Saved successfully.");
        })
        .catch(err => {
            res.send(`Save error: ${ err.message }`);
        });
});

app.get("/film/:id", (req, res) => {
    const id = req.params.id;
    findFilmByID(id)
        .then(result => {
            if(!result)
                res.send(`No film with id ${id} was found.`);
            else
                res.send(result);
        })
        .catch(err => {
            res.send(`Find error: ${ err.message }`);
        });
});

app.get("/films", (req, res) => {
    findAllFilms()
        .then(foundFilm => {
            res.send(foundFilm);
        })
        .catch(err => {
            res.send(`Find all error: ${ err.message }`);
        });
});

app.patch("/film", async (req, res) => {
    const body = req.body;
    const id = body.id;
    const updatedFields = {...body};
    delete updatedFields.id;
    updateFilm(id, updatedFields)
        .then((updated) => {
            if(updated.matchedCount === 0)
                res.send(`Film with id ${id} does not exist.`);
            else
                res.send(`Successful update of film with id ${id}`);
        })
        .catch(err => {
            res.send(`Update error: ${ err.message }`);
        });
});

app.delete("/film/:id", async (req, res) => {
    const id = req.params.id;
    deleteFilm(id)
        .then((deleted) => {
            if(deleted.deletedCount === 0)
                res.send(`Film with id ${id} does not exist.`);
            else
                res.send(`Successful delete of film with id ${id}`);
        })
        .catch(err => {
            res.send(`Delete error: ${ err.message }`);
        });
});

