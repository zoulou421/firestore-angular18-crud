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

  notesData:any=[]

  editForm!:FormGroup;

  noteDetails!:any;

  noteObj:Note={
    id: '',
    note_title: '',
    note_desc: ''
  }

  constructor(private fb:FormBuilder,private noteService:NoteService){
    this.noteForm=this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required]
    });

    this.editForm=this.fb.group({
      edit_title:['',Validators.required],
      edit_description:['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.getAllNotes();
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
        this.noteForm.reset()
      }
    })
  }

  //Get All
  getAllNotes(){
    this.noteService.getNotes().subscribe((res:Note[])=>{
      console.log(res);
      this.notesData=res;
    })
  }

  //Delete
  deleteNote(note:Note){
    let decision=confirm("Are sure want to delete this Note ?");
    if(decision==true){
      this.noteService.deleteNote(note);
    }
  }

  getAllDetailsV2(note:Note){
    this.noteDetails=note
    console.log('Selected Note:', this.noteDetails); // Debugging: check if noteDetails has an id
  }

  getAllDetailsV3(note: Note) {
    this.noteDetails = note; // Ensure the selected note has its `id` stored
    console.log('Selected note:', this.noteDetails);  // Debug: confirm `id` exists
  }
  
  getAllDetails(note: Note) {
    this.noteDetails = note;
    console.log("Selected Note ID:", this.noteDetails.id);  // Check if `id` exists
  }
  

  //update improved
  /*updateNote(note: Note) {
    const { value } = this.editForm;
    console.log(value);
  
    // Assign the `id` from the selected note
    this.noteObj.id = note.id; // Ensure the note ID is assigned correctly
    this.noteObj.note_title = value.edit_title;
    this.noteObj.note_desc = value.edit_description;
  
    // Check for undefined values before calling the update
    if (!this.noteObj.id) {
      alert("Note ID is missing!");
      return;
    }else{
      this.noteService.updateNote(note,this.noteObj).then((res)=>{
        console.log(res)
        alert("Note Updated Successfully");
      })
      this.editForm.reset();
    }*/
  //end update improved

  //Update note
  updateNoteV2(note:Note){
     const{value}=this.editForm;
     console.log(value);
    (this.noteObj.id=note.id),
    (this.noteObj.note_title=value.edit_title),
    (this.noteObj.note_desc=value.edit_description)

    this.noteService.updateNote(note,this.noteObj).then((res)=>{
      console.log(res)
      alert("Note Updated Successfully");
    })
    this.editForm.reset();
  }

  updateNote() {
    const { value } = this.editForm;
  
    // Ensure that noteDetails has a valid ID
    if (!this.noteDetails || !this.noteDetails.id) {
      alert("Note ID is missing!");
      return;
    }
  
    // Update the noteObj fields with the form data and the correct note ID
    this.noteObj.id = this.noteDetails.id;
    this.noteObj.note_title = value.edit_title;
    this.noteObj.note_desc = value.edit_description;
  
    // Call the service to update the note
    this.noteService.updateNote(this.noteDetails, this.noteObj).then((res) => {
      console.log(res);
      alert("Note Updated Successfully");
    }).catch((error) => {
      console.error("Error updating the note:", error);
    });
  
    this.editForm.reset();
  }
  
/*
    updateNote() {
      const { value } = this.editForm;
      console.log(value);
    
      // Ensure that noteDetails has the ID before proceeding
      if (!this.noteDetails || !this.noteDetails.id) {
        alert("Note ID is missing!");
        return;
      }
    
      this.noteObj.id = this.noteDetails.id;  // Assign from selected noteDetails
      this.noteObj.note_title = value.edit_title;
      this.noteObj.note_desc = value.edit_description;
    
      this.noteService.updateNote(this.noteDetails.id, this.noteObj).then((res) => {
        console.log('Note updated successfully:', res);
        alert("Note Updated Successfully");
      }).catch((error) => {
        console.error("Error updating note:", error);
      });
    
      this.editForm.reset();
    }
    */

    

}
