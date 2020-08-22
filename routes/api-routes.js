//dependencies
const fs = require("fs");
let allNotes = require('../db/db.json');

module.exports = (app) =>
{
    //retreive all notes
    app.get('/api/notes', (req,res) =>
    {
        console.log("Loading all notes");
        res.json(allNotes);
    });

    //create a new note
    app.post('/api/notes', (req, res) =>
    {
        //create new note object with properties from the html body
        const note = req.body;

        //variable to get the last note id
        let lastid = 0;

        //iterates through the id property in allNotes, sets it to the highest until equal
        for (let i in allNotes)
        {
            let id = allNotes[i].id;
                    
            //sets the value to the id of the note in the array until it is equal to the highest note.id value
            if (id > lastid)
            {
                lastid = id;
            }
        };

        //increments and sets the new notes' id and 
        note.id = lastid + 1;
        //adds new node with incremented id to the allNotes 
         allNotes.push(note);

            console.log("note added");

        //adds it to the allNotes array in the db.json file
        fs.writeFile("db/db.json", JSON.stringify(allNotes), function(err) 
        { 
            if(err){return console.log(err);} 
        });


    });

    //get single note
  /*   app.get("/api/notes/:id", (req,res) => 
    {
        //set the value of the note's id in the path
        const selectNote = parseInt(req.params.id);

        //iterate through allNotes
        for (let i in allNotes)
        {
            //creates a object equal to values of the iterated note
            let {id, title, text}= allNotes[i];

            //checks if the id of the note equals the id in the path
            if (id === selectNote)
            {
                //returns the last object created with the notes' values
                res.json({"id":id,"title":title,"text":text});
            }
        }
    });
 */
    //delete note
    app.delete("/api/notes/:id", (req,res) => 
    {
        //get the id of the note from the url
        const selectNote = parseInt(req.params.id);

        //create a new object that has all of allNotes except for the note that equals the id in the url
        let newNoteList = allNotes.filter(({id}) => id !== selectNote);

        //set allNotes to the new list
        allNotes = newNoteList;

        //set the new allNotes to the json file
        fs.writeFile("db/db.json", JSON.stringify(allNotes), function(err)
        { 
            if (err){return console.log(err);}
            console.log("note deleted");
            //new allNotes list
            res.json(allNotes);
        });
    });
}