 //console.log("statrting app");

 const fs=require('fs');
 const notes=require('./notes.js');
 const _ = require('lodash');
 const yargs = require('yargs');
 const titleopt = {
        describe:'Title of note',
        demand:true,
        alias:'t'
    };

 const argv = yargs
 .command('add','Add a new note',{
    title: titleopt,
    body: {
    	describe:'Body of note',
        demand:true,
        alias:'b'
    }
 })
 .command('List','List all notes')
 .command('read','Read a note',{
 	title: titleopt

 })
 .command('Remove','Remove a note',{
     title: titleopt
 })
 .help()
 .argv;

//console.log("process : ",process.argv);
//console.log("yargv : ",argv);

//var command= process.argv[2];
var command= argv._[0 ];

if(command=="add")
{
	var note = notes.addNote(argv.title,argv.body);
	if(note)
	{
		console.log("note added : "+note.title);
	}
	else
	{
		console.log("Duplicate cannot be added");
	}
}
else if(command=="read")
{

	 var note = notes.readNote(argv.title);
	 if(note == false)
	 {console.log(("No note found"));
     }
     else
     {
      notes.logNote(note);
     }
}else if(command=="list"){

    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => {
       notes.logNote(note);
    });

}else if(command=="remove"){
	var message = notes.removeNote(argv.title);
	if(message == true)
	{
		console.log("note was removed");
	}else{
	 console.log("no notes of title "+argv.title+ " was found and no nodes removed.");
	}
	
}else{
	console.log("command not found");
}

