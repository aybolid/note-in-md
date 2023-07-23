import { RootState } from '@/lib/redux/rootReducer';
import type { Note } from '@/types/notes';
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { getUserNotes } from './notesThunk';

interface NotesState {
  userNotes: { [key: string]: Note };
  amount: number | undefined;
  notesTags: string[];
  loadingNotes: boolean;
  notesError: string;
}

const initialState: NotesState = {
  userNotes: {},
  amount: undefined,
  notesTags: [],
  loadingNotes: false,
  notesError: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<NotesState>) {
    builder
      .addCase(getUserNotes.pending, (state) => {
        state.loadingNotes = true;
        state.notesError = '';
      })
      .addCase(getUserNotes.fulfilled, (state, action) => {
        const notes = action.payload.notes;
        const amount = action.payload.results;

        notes.reduce((acc, note) => {
          acc[note._id] = note;
          return acc;
        }, state.userNotes);

        state.amount = amount;

        state.loadingNotes = false;

        notes.forEach((note) => {
          note.tags.forEach((tag) => {
            if (!state.notesTags.includes(tag)) {
              state.notesTags = state.notesTags.concat(tag);
            }
          });
        });
      })
      .addCase(getUserNotes.rejected, (state, action) => {
        state.loadingNotes = false;
        state.notesError = action.error.message || 'Something went wrong';
      });
  },
});

export const selectNotes = (state: RootState) => state.notes;
export const selectNote = (state: RootState, id: string | undefined) => {
  return id ? state.notes.userNotes[id] : null;
};

export default notesSlice.reducer;
