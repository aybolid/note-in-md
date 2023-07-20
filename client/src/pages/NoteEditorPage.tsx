import React from 'react';
import { format } from 'date-fns';
import MDEditor from '@uiw/react-md-editor';
import type { ContextStore } from '@uiw/react-md-editor/lib/Context';
import Button from '../components/Button/Button';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../lib/redux/store';
import { selectNote, selectNotes } from '../lib/redux/slices/notes/notesSlice';

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio veniam in qui doloribus rem alias, eveniet facilis vel nulla porro explicabo libero excepturi at quasi architecto ipsam minus? Consequatur, eius.';
const testMd = `# Test Note\n${lorem.repeat(
  3
)}\n\nTest link -> [github](https://github.com)\n## Heading 2\n### Heading 3 (List)\n1. Item 1\n   - subitem 1\n   - subitem 2\n2. Item 2\n### Image\n![Image](https://media.tenor.com/ncuUhM6cWjQAAAAd/%D0%B4%D0%B6%D0%B0%D0%BA%D1%83%D0%B7%D1%96-%D0%B4%D0%B6%D0%B0%D0%BA%D1%83%D0%B7%D0%B8.gif)`;

export default function NoteEditorPage() {
  const id = useParams().id;
  const [editor, setEditor] = React.useState(true);
  const { current: date } = React.useRef<string>(
    format(new Date(), 'EEEE dd.MM.yyyy')
  );

  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [md, setMd] = React.useState<string | undefined>(undefined);

  const note = useAppSelector((state) => selectNote(state, id));
  const { loadingNotes } = useAppSelector(selectNotes);
  React.useEffect(() => {
    if (note) {
      setTitle(note.title);
      setMd(note.content);
    }
  }, [note]);

  if (loadingNotes) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-between py-4 w-full items-center">
        <input
          value={title ?? date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="bg-transparent border-none text-3xl font-semibold focus:ring-0 w-full"
        />
        <Button
          as="btn"
          onClick={() => setEditor(!editor)}
          variant="secondary"
          size="small"
          className="w-20"
        >
          {editor ? 'Formatted' : 'Edit'}
        </Button>
      </div>
      {editor ? (
        <MDEditor
          hideToolbar
          preview="edit"
          className="dark:bg-stone-900 bg-stone-100 dark:text-orange-50 text-stone-700 dark:border-stone-900 dark:outline-stone-900 rounded-md"
          value={md ?? testMd}
          spellCheck
          onChange={
            setMd as (
              value?: string | undefined,
              event?: React.ChangeEvent<HTMLTextAreaElement> | undefined,
              state?: ContextStore | undefined
            ) => void
          }
        />
      ) : (
        <MDEditor.Markdown
          source={md}
          className="prose prose-headings:text-white prose-p:text-stone-300 prose-p:leading-5 prose-p:border-l prose-p:pl-2 prose-p:border-orange-400 prose-a:!text-orange-400 dark:prose-invert min-w-full dark:bg-stone-900 bg-none rounded-md px-8 py-4"
        />
      )}
    </>
  );
}
