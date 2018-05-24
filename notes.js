//console.log("starting notes");
const fs = require('fs'); 

var fetchNotes = () => {
	try
    {
    	var noteString = fs.readFileSync('note-data.json');
    	return JSON.parse(noteString);
    }catch(e){
    	return [];
    }

}

var saveNote = (notes) => {
	debugger
	fs.writeFileSync('note-data.json',JSON.stringify(notes));
}

var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
    	title,
    	body 
    };
    var duplicateNotes = notes.filter((note) => note.title==title);
    if(duplicateNotes.length==0)
    {
    	notes.push(note);
    	saveNote(notes);
    	return note;
    }
   
};
var readNote = (title) => {
	var notes = fetchNotes();
     var filter = notes.filter((note) => note.title==title);
      if(filter.length==0){
      	return false;
      }else{
      	return filter[0];
      }
};
var removeNote = (title) => {
     var notes = fetchNotes();
     var filter = notes.filter((note) => note.title!=title);
    saveNote(filter);
    if(notes.length != filter.length)
    	{return true;}else{
    		return false;
    	}
};

var getAll = () => {
   return fetchNotes();
};

var logNote = (note) => {
	        console.log("--------"); 
        	console.log(note.title);
        	console.log("Body : "+note.body);
};

module.exports = {
	addNote,
	readNote,
	removeNote,
	getAll,
	logNote
};

 

