import React from 'react';
import { format } from 'date-fns';
import MDEditor from '@uiw/react-md-editor';
import type { ContextStore } from '@uiw/react-md-editor/lib/Context';
import Button from '../components/Button/Button';

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio veniam in qui doloribus rem alias, eveniet facilis vel nulla porro explicabo libero excepturi at quasi architecto ipsam minus? Consequatur, eius.';

export default function NoteEditorPage() {
  const [editor, setEditor] = React.useState(true);
  const [trueTitle, setTrueTitle] = React.useState<string | null>(null);

  const { current: date } = React.useRef<Date>(new Date());
  const initTitle = format(date, 'EEEE dd.MM.yyyy');

  const [md, setMd] = React.useState<string>(
    `# Test Note\n${lorem.repeat(3)}\n\nTest link -> [github](https://github.com)\n## Heading 2\n### Heading 3 (List)\n1. Item 1\n   - subitem 1\n   - subitem 2\n2. Item 2\n### Image\n![Image](https://media.tenor.com/ncuUhM6cWjQAAAAd/%D0%B4%D0%B6%D0%B0%D0%BA%D1%83%D0%B7%D1%96-%D0%B4%D0%B6%D0%B0%D0%BA%D1%83%D0%B7%D0%B8.gif)`
  );
  return (
    <>
      <div className="flex justify-between py-4 w-full items-center">
        <input
          value={trueTitle ?? initTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTrueTitle(e.target.value)
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
          value={md}
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
