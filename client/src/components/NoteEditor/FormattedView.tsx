import { selectNoteEditor } from '@/lib/redux/slices/noteEditor/noteEditorSlice';
import { useAppSelector } from '@/lib/redux/store';
import MDEditor from '@uiw/react-md-editor';

export default function FormattedView() {
  const { note } = useAppSelector(selectNoteEditor);

  return (
    <MDEditor.Markdown
      className="prose dark:prose-invert prose-p prose-headings prose-hr prose-code prose-img bg-transparent min-w-full h-full px-8 py-4 rounded-md"
      source={note?.content.replace(/\+\[.*?\]/g, '').trim()}
    />
  );
}
