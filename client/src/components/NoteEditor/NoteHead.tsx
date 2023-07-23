import {
  selectNoteEditor,
  setNoteTitle,
  toggleEditor,
} from '@/lib/redux/slices/noteEditor/noteEditorSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import React from 'react';
import { MdEdit } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';

export default function NoteHead() {
  const dispatch = useAppDispatch();
  const { note, displayEditor, isEdited } = useAppSelector(selectNoteEditor);

  return (
    <>
      <p>{isEdited && 'Edited'}</p>
      <div className="flex justify-between py-2 w-full items-center">
        <div className="relative">
          <input
            value={note?.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setNoteTitle(e.target.value))
            }
            className="border-none pr-8 text-3xl text-purple-500 dark:text-purple-600 font-semibold focus:ring-0 bg-stone-100 dark:bg-stone-900 min-w-fit rounded-md max-w-full"
          />
          <MdEdit className="absolute top-2 right-2 text-purple-500" />
        </div>
        <Button
          as="btn"
          onClick={() => dispatch(toggleEditor())}
          variant="secondary"
          size="small"
          className="w-36"
        >
          {displayEditor ? 'Formatted View' : 'Note Editor'}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {note?.tags.map((tag) => (
          <NavLink
            className={
              'bg-sky-500 dark:bg-sky-600 opacity-60 hover:opacity-100 text-white px-2 rounded-md'
            }
            key={tag}
            to={'#'}
          >
            #{tag}
          </NavLink>
        ))}
      </div>
    </>
  );
}
