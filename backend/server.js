//Loading env variables
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}



//Importing Dependencies
const express = require("express");
const connectToDb = require("./config/connectToDB");

//Importing the Data Models
const Note = require("./models/notes")

//Creating an Express App
const app = express()

//Express cannot read json by default so I have to configure it with the code below
app.use(express.json())

//Connecting o DB
connectToDb();

//Routing
app.get("/", (req, res) => {
    res.json("Hello World")
})

app.post("notes", async (req, res) => {
    //Get the sent in data of the request body
   const title = req.body.title;
   const body = req.body.body;

    //Create a note with the the data
    const note = await Note.create({
        title: title,
        body: body,
    })
    //Respond with the new note
    res.json({note: note})
})

//Starting Server
app.listen(process.env.PORT);