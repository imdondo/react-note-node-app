
const express = require("express");
const app = express();
const dotenv =require("dotenv/config");
const winston = require('winston');
const cors = require('cors');

app.use(express.json);
app.use(cors());

const notes=[
    {id: 1, topic:'Front End', description: 'React is the most popular '},
    {id: 2, topic:'Front End', description: 'Angular is a framework '},
    {id: 3, topic:'Backend', description: 'Java is just as dominant or even more so! '}
];


app.get("/api", (req,res)=>{
    res.json({
        success:1,
        message: "The note api is working!"

    });
});
app.get("/api/notes", (req,res)=>{
    res.send(notes);
});
app.get("/api/notes/:id", (req,res)=>{
   const note =notes.find(n=n.id === parseInt(req.params.id));
   if(!note) res.status(404).send("The note with the given id  was not found");
   res.send(note);
});
app.post("/api/notes", (req,res)=>{
    const note ={
        id: notes.length+1,
        topic: req.params.topic,
        description: req.params.description
    };
    notes.push(note);
    res.send(note);
 });
app.listen(process.env.PORT || 3000, ()=>{
    // winston.log('info', `Server up and running on port ${process.env.PORT}`);
    console.log(`Server up and running on port ${process.env.PORT}`);
});
