import { RootState } from '@/lib/redux/rootReducer';
import { Note } from '@/types/notes';
import { getTags } from '@/utils/noteTags';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

type NewNote = Omit<Note, '_id' | 'createdAt' | 'updatedAt' | 'authorId'>;

interface NoteEditorState {
  displayEditor: boolean;
  note: Note | NewNote | null;
  isEdited: boolean;
  // tagPattern: string;
}

const initialState: NoteEditorState = {
  displayEditor: true,
  note: null,
  isEdited: false,
  // tagPattern: /\+\[.*?\]/g.toString(),
};

const noteEditorSlice = createSlice({
  name: 'noteEditor',
  initialState,
  reducers: {
    setNote(state, action: PayloadAction<Note | null>) {
      if (!action.payload) {
        const newNote: NewNote = {
          title: format(new Date(), 'EEEE, MM.dd yyyy'),
          content: testMD,
          tags: [],
        };
        state.note = newNote;
        return;
      }
      state.note = action.payload;
    },
    setNoteTitle(state, action: PayloadAction<string>) {
      state.note.title = action.payload;
      state.isEdited = true;
    },
    setNoteContent(state, action: PayloadAction<string | undefined>) {
      if (!action.payload) return;

      state.note.content = action.payload;

      state.note.tags = getTags(action.payload, /\+\[.*?\]/g);

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

const testMD = `
+[test, note, tags]
# Initial Test Note

This is a test note. It contains all possible markdown syntax (no). It's just a test. :) Lorem ipsum dolor sit amet, 
consectetur adipiscing elit. Nullam euismod, nisi ut pretium varius, mauris nunc viverra leo, vel condimentum nunc nibh id nisi.

### Image

![Image Alt Text](https://pngimg.com/uploads/calculator/calculator_PNG7938.png)

---

### Some Code Tests

\`Inline Code\`
\`\`\`js
// JS
const greet = (name) => {
  return 'Hello, ' + name + '!';
}
\`\`\`

\`\`\`python
# Python
def greet(name):
  return 'Hello, ' + name + '!'
\`\`\`

\`\`\`rust
// Rust
fn main() {
  let mut hello = String::from("Hello, World!");
  println!(hello);
}
\`\`\`

> I don't know how to style copy button in code blocks...

^ this blockquote btw...

---

### Table

| Column 1  | Column 2 |
| --------- | -------- |
| Cell 1-1  | Cell 1-2 |
| Cell 2-1  | Cell 2-2 |

---

## Text styles
##### Bold
__Bold Text__
##### Italic
*Italic Text*
##### Italic + Bold
***Italic + Bold Text***
##### Strikethrough
~~Strikethrough Text~~

---

## Lists
### Ordered List
1. Ordered List Item 1
2. Ordered List Item 2

### Unordered List
- Unordered List Item 1
- Unordered List Item 2

### Checklist
- [x] Task 1 (completed)
- [ ] Task 2 (incomplete)
- [ ] Task 3 (incomplete)

### Combined List
1. Todo
    - [x] Task 1 (completed)
    - [ ] Task 2 (incomplete)
2. Something else
    - item 1
    - item 2

Here's an inline HTML code: <span style="color: red;">Red Text</span>
`;
