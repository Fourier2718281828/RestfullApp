"use strict";
const mongoose = require("mongoose");

const MongusSchema = mongoose.Schema;
const FilmSchema = new MongusSchema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    actors: {
        type: [String],
        required: true
    },
});

const film = mongoose.model("films", FilmSchema);

async function saveFilm(inFilm)
{
    const filmToSave = new film(inFilm);
    return filmToSave.save();
}

async function findAllFilms()
{
    return film.find();
}

async function findFilmByID(id)
{
    const monId = new mongoose.Types.ObjectId(id);
    return film.findById(monId);
}

async function updateFilm(id, newFilm)
{
    const monId = new mongoose.Types.ObjectId(id);
    return film.updateOne({ _id: monId }, { $set : newFilm});
}

async function deleteFilm(id)
{
    const monId = new mongoose.Types.ObjectId(id);
    return film.deleteOne({_id : monId});
}

module.exports = { saveFilm, findFilmByID, findAllFilms, updateFilm, deleteFilm}
