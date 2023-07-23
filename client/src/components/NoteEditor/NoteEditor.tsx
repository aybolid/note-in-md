import MDEditor from '@uiw/react-md-editor';
import { useAppDispatch, useAppSelector } from '../../lib/redux/store';
import {
  selectNoteEditor,
  setNoteContent,
} from '../../lib/redux/slices/noteEditor/noteEditorSlice';

export default function NoteEditor() {
  const dispatch = useAppDispatch();
  const { note } = useAppSelector(selectNoteEditor);
  return (
    <MDEditor
      className="!h-full !shadow-none bg-stone-100 dark:bg-stone-900 rounded-md px-4 py-2 text-stone-700 dark:text-stone-300"
      value={note?.content}
      preview="edit"
      hideToolbar
      onChange={(
        value?: string
        // event?: React.ChangeEvent<HTMLTextAreaElement> | undefined,
        // state?: ContextStore | undefined
      ) => dispatch(setNoteContent(value))}
    />
  );
}
