import MDEditor from '@uiw/react-md-editor';
import { useAppSelector } from '../../lib/redux/store';
import { selectNoteEditor } from '../../lib/redux/slices/noteEditor/noteEditorSlice';
import React from 'react';
import { removeTagsFromMD } from '../../utils/md';

export default function FormattedView() {
  const { note } = useAppSelector(selectNoteEditor);
  const [content, setContent] = React.useState('');
  React.useEffect(() => {
    if (!note) return;
    const { content } = note;
    const formattedContent = removeTagsFromMD(content);

    setContent(formattedContent);
  }, [note, note?.content]);

  return (
    <MDEditor.Markdown
      className="prose dark:prose-invert prose-p prose-headings prose-hr prose-code prose-img bg-transparent min-w-full h-full px-8 py-4 rounded-md"
      source={content}
    />
  );
}
