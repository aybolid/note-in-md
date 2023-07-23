/* eslint-disable no-useless-escape */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Note } from '../../../../types/notes';
import { RootState } from '../../rootReducer';
import { format } from 'date-fns';

type NewNote = Omit<Note, '_id' | 'createdAt' | 'updatedAt' | 'authorId'>;

interface NoteEditorState {
  displayEditor: boolean;
  note: Note | NewNote | null;
  isEdited: boolean;
}

const initialState: NoteEditorState = {
  displayEditor: true,
  note: null,
  isEdited: false,
};

const noteEditorSlice = createSlice({
  name: 'noteEditor',
  initialState,
  reducers: {
    setNote(state, action: PayloadAction<Note | null>) {
      if (!action.payload) {
        const newNote: NewNote = {
          title: format(new Date(), 'EEEE, MM.dd yyyy'),
          content: allPossibleMarkdown,
          tags: [],
        };
        state.note = newNote;
        return;
      }
      state.note = action.payload;
    },
    setNoteTitle(state, action: PayloadAction<string>) {
      state.note!.title = action.payload;
      state.isEdited = true;
    },
    setNoteContent(state, action: PayloadAction<string | undefined>) {
      if (!action.payload) return;

      state.note!.content = action.payload;
      state.isEdited = true;
    },
    toggleEditor(state) {
      state.displayEditor = !state.displayEditor;
    },
    setIsEdited(state, action: PayloadAction<boolean>) {
      state.isEdited = action.payload;
    },
  },
});

export default noteEditorSlice.reducer;

export const { setNote, setNoteTitle, setNoteContent, toggleEditor } =
  noteEditorSlice.actions;
export const selectNoteEditor = (state: RootState) => state.noteEditor;

const allPossibleMarkdown = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

**Bold Text**
*Italic Text*
***Bold and Italic Text***

---

> Blockquote

---

1. Ordered List Item 1
2. Ordered List Item 2
3. Ordered List Item 3

---

- Unordered List Item 1
- Unordered List Item 2
- Unordered List Item 3

---

[Link](https://www.example.com)
![Image Alt Text](https://pngimg.com/uploads/calculator/calculator_PNG7938.png)

---

\`Inline Code\`
\`\`\`js
// Code Block
function greet(name) {
  return 'Hello, ' + name + '!';
}
\`\`\`

---

| Column 1  | Column 2 |
| --------- | -------- |
| Cell 1-1  | Cell 1-2 |
| Cell 2-1  | Cell 2-2 |

---

~~Strikethrough Text~~

---

- [x] Task 1 (completed)
- [ ] Task 2 (incomplete)
- [ ] Task 3 (incomplete)

Here's an inline HTML code: <span style="color: red;">Red Text</span>
`;

console.log(allPossibleMarkdown);
