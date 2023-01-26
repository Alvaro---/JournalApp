import { async } from '@firebase/util';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';

export const startNewNote = () => {

    return async (dispatch, getState) => {

        dispatch(savingNewNote());
        console.log('startNewNote')
        console.log(getState())

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        const setDocResp = await setDoc(newDoc, newNote);
        console.log(newDoc)
        console.log(setDocResp)

        newNote.id === newDoc.id


        /* REGLAS PARA FIREBASE - cloud firestore
            allow read, write: if request.auth!=null;
        */

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error("El id del usuario no existe")
        console.log(uid)
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        console.log(noteToFirestore)

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true }) //MERGE dice que se mantengan los cambios que no se actualicen
        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        console.log(files)
        // await fileUpload(files[0]);

        //lanzar simultaneo
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        console.log(photosUrls)
        dispatch(setPhotosToActiveNote(photosUrls))
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        console.log(uid, note)

        const docRef= doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id))
    }
}