import React from 'react'
import Button from '../../stories/components/Button'
import { useAuth } from '../../contexts/AuthContext'
import { NavLink } from 'react-router-dom'
import { MdMenuOpen } from 'react-icons/md'
import useOutsideClick from '../../hooks/useOutsideClick'
import useScrollLock from '../../hooks/useScrollLock'

export default function Aside() {
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const asideRef = React.useRef<HTMLDivElement>(null)

  useOutsideClick(asideRef, () => setDisplayMenu(false))
  useScrollLock(displayMenu)

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
  )
}

const MyNotes = () => {
  return (
    <div className="w-full px-4 flex-grow">
      <h2 className="text-lg mb-1">My notes:</h2>
      <Button as="btn" className="w-full" variant="primary" size="medium" onClick={() => console.log('create note')}>
        + new note
      </Button>
      <ul className="mt-4 w-full">
        {/* //todo display notes */}
        <p className="opacity-60 text-center">This is a place for all of your notes</p>
      </ul>
    </div>
  )
}

const CurrentUser = () => {
  const { user } = useAuth()
  return user ? (
    <NavLink className={'text-xl hover:underline'} to={'/profile'}>
      {user.name}
    </NavLink>
  ) : (
    <Button className="w-full font-semibold" as="link" path="/auth/signup" variant="success" size="medium">
      Signup / Login
    </Button>
  )
}
