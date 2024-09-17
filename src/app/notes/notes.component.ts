import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { Note } from '../services/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  noteForm!:FormGroup

  noteObj:Note={
    id: '',
    note_title: '',
    note_desc: ''
  }

  constructor(private fb:FormBuilder,private noteService:NoteService){
    this.noteForm=this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required]
    })
  }
  ngOnInit(): void {
  }

  addNote(){
    
    const {value}=this.noteForm
    console.log(value)
    this.noteObj.id='',
    this.noteObj.note_title=value.title,
    this.noteObj.note_desc=value.description

    this.noteService.addNote(this.noteObj).then((note)=>{
      if(note){
        alert("Note added successfully!");
      }
    })
   
  }
}
