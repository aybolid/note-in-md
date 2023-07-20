import React from 'react';
import Button from '../Button/Button';
import { NavLink } from 'react-router-dom';
import { MdMenuOpen, MdNoteAdd } from 'react-icons/md';
import useOutsideClick from '../../hooks/useOutsideClick';
import useScrollLock from '../../hooks/useScrollLock';
import { useAppSelector } from '../../lib/redux/store';
import { selectAuth } from '../../lib/redux/slices/auth/authSlice';
import { selectNotes } from '../../lib/redux/slices/notes/notesSlice';

export default function Aside() {
  const [displayMenu, setDisplayMenu] = React.useState(false);
  const asideRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(asideRef, () => setDisplayMenu(false));
  useScrollLock(displayMenu);

  return (
    <>
      <aside
        ref={asideRef}
        className={`w-64 flex absolute z-50 top-0 bg-stone-100 dark:bg-stone-950 h-screen justify-start items-center flex-col gap-4 border-r border-stone-300 dark:border-black overflow-y-auto duration-150 ease-in-out ${
          displayMenu ? 'left-0' : '-left-64'
        }`}
      >
        <NavLink
          onClick={() => setDisplayMenu(false)}
          to={'/'}
          className="text-2xl px-4 py-2 w-full text-center font-semibold bg-stone-50 dark:bg-stone-900 hover:underline"
        >
          NoteInMD
        </NavLink>

        <MyNotes />

        <div className="p-4 w-full">
          <CurrentUser />
        </div>
      </aside>
      {!displayMenu && (
        <Button
          as="btn"
          variant="primary"
          size="small"
          onClick={() => setDisplayMenu(!displayMenu)}
          className="absolute bottom-4 left-4 rotate-180"
        >
          <MdMenuOpen size={25} />
        </Button>
      )}
    </>
  );
}

const MyNotes = () => {
  const { userNotes, loadingNotes, notesError, amount } =
    useAppSelector(selectNotes);
  const notes = Object.values(userNotes);

  return (
    <div className="w-full px-4 flex-grow">
      <h2 className="text-lg mb-1">
        My notes <span className="opacity-50">{amount && `(${amount})`}</span>
      </h2>
      <Button
        as="link"
        className="w-full flex justify-center items-center gap-2 font-semibold"
        variant="success"
        size="medium"
        path="/new-note"
      >
        New Note <MdNoteAdd size={25} />
      </Button>
      {loadingNotes && <p>Loading...</p>}
      {notesError ? (
        <p>{notesError}</p>
      ) : (
        <ul className="mt-4 w-full flex flex-col gap-2">
          {!!notes.length &&
            notes.map((note) => (
              <li key={note._id}>
                <Button
                  as="link"
                  className="w-full flex justify-center items-center gap-2 font-semibold"
                  variant="secondary"
                  size="small"
                  path={`/note/${note._id}`}
                >
                  {note.title}
                </Button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

const CurrentUser = () => {
  const { user } = useAppSelector(selectAuth);

  return user ? (
    <NavLink className={'text-xl hover:underline'} to={'/profile'}>
      {user.name}
    </NavLink>
  ) : (
    <Button
      className="w-full font-semibold"
      as="link"
      path="/auth/signup"
      variant="success"
      size="medium"
    >
      Signup / Login
    </Button>
  );
};
