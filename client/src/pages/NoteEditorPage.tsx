import React from 'react';
import { useParams } from 'react-router-dom';
import FormattedView from '../components/NoteEditor/FormattedView';
import NoteEditor from '../components/NoteEditor/NoteEditor';
import NoteHead from '../components/NoteEditor/NoteHead';
import {
  selectNoteEditor,
  setNote,
} from '../lib/redux/slices/noteEditor/noteEditorSlice';
import { selectNote, selectNotes } from '../lib/redux/slices/notes/notesSlice';
import { useAppDispatch, useAppSelector } from '../lib/redux/store';

export default function NoteEditorPage() {
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const note = useAppSelector((state) => selectNote(state, id));
  React.useEffect(() => {
    dispatch(setNote(note));
  }, [dispatch, id, note]);

  const { displayEditor } = useAppSelector(selectNoteEditor);
  const { loadingNotes } = useAppSelector(selectNotes);

  if (loadingNotes) return <>Loading...</>;

  if (id && !note) {
    return <>Note not found</>;
  }

  return (
    <>
      <NoteHead />
      <div className="overflow-y-auto">
        {displayEditor ? <NoteEditor /> : <FormattedView />}
      </div>
    </>
  );
}
