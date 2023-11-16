//Loading env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//Importing Dependencies
const express = require("express");
const cors = require("cors")
const connectToDb = require("./config/connectToDB");

//Importing the Data Models
const Note = require("./models/notes");

//Creating an Express App
const app = express();

//Express cannot read json by default so I have to configure it with the code below
app.use(express.json());
app.use(cors())

//Connecting o DB
connectToDb();

//Routing
app.get("/", (req, res) => {
  res.json("Hello World");
});
app.get("/notes", async (req, res) => {
  //Find the Notes
  const notes = await Note.find();
  //Respond with notes
  res.json({ notes: notes });
});
app.get("/notes/:id", async (req, res) => {
  //Get the id from the request
  const id = req.params.id;
  //Find the note with the id
  const note = await Note.findById(id);
  //Respond with the note
  res.json({ note: note });
});
app.post("/notes", async (req, res) => {
  //Get the sent in data of the request body
  const title = req.body.title;
  const body = req.body.body;

  //Create a note with the the data
  const note = await Note.create({
    title: title,
    body: body,
  });
  //Respond with the new note
  res.json({ note: note });
});
app.put("/notes/:id", async (req, res) => {
  //Get the id from the request
  const id = req.params.id;
  //Get the sent in data of the request body
  const title = req.body.title;
  const body = req.body.body;
  //Find the note with the id and update it
  const note = await Note.findByIdAndUpdate(id, {
    title: title,
    body: body,
  });
  //Respond with the updated note
  res.json({ note: note });
});

app.delete("/notes/:id", async (req, res) => {
  //Get the id from the request
  const id = req.params.id;
  //Find the note with the id and delete it
  const note = await Note.findByIdAndDelete(id);
  //Respond with the deleted note
  res.json("Successfully Deleted Note");
});

//Starting Server
app.listen(process.env.PORT);
