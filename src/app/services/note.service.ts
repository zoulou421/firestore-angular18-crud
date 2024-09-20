import { Injectable } from '@angular/core';
import { Note } from './note';
import { collection } from 'firebase/firestore';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private fs: Firestore) { }

  //Add new Note Code here
  /*addNote(note: Note) {
    note.id = doc(collection(this.fs, 'id')).id
    return addDoc(collection(this.fs, 'Notes'), note)
  }*/
    addNote(note: Note) {
      // Automatically assign an ID during the addition process
      return addDoc(collection(this.fs, 'Notes'), note);
    }
    



  //Get All notes from Database
  getNotes(): Observable<Note[]> {
    let notesRef = collection(this.fs, 'Notes')
    return collectionData(notesRef,
      { idField: 'id' }) as Observable<Note[]>
  }

  // Delete notes from Database
  deleteNote(note: Note) {
    const docRef = doc(this.fs, `Notes/${note.id}`);
    return deleteDoc(docRef);  // Make sure to return the promise so that you can handle it later
  }

  //Update notes from database
  //updateNote(note:Note, notes:any){
   // let docRef=doc(collection(this.fs,`Notes/${note.id}`));
  //}
  
  /*updateNote(note: Note, notes: any) {
    // Create a reference to the document
    let docRef = doc(this.fs, `Notes/${note.id}`);
    
    // Perform the update operation
    return updateDoc(docRef, notes);
  }*/

    updateNote(note: Note, updatedNoteData: Partial<Note>) {
      // Ensure the note object has an ID before proceeding
      if (!note.id) {
        throw new Error('Note ID is missing, cannot update the note.');
      }
    
      // Create a reference to the document using the note's ID
      let docRef = doc(this.fs, `Notes/${note.id}`);
    
      // Perform the update operation
      return updateDoc(docRef, updatedNoteData);
    }
    
}
