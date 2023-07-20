import { NavLink } from 'react-router-dom';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

const navLinks = {
  About: '/about',
  Markdown: '/md-tutorial',
};

export default function Header() {

  return (
    <header className="bg-stone-50 dark:bg-stone-900 px-6 py-1 flex justify-between items-center gap-2">
      <nav className="flex justify-center items-center gap-6">
        {Object.entries(navLinks).map(([name, path]) => (
          <NavLink
            key={name}
            to={path}
            className={
              'opacity-70 hover:opacity-100 hover:underline duration-100 ease-in-out'
            }
          >
            {name}
          </NavLink>
        ))}
        <NavLink
          to={'/this-route-does-not-exist'}
          className={
            'opacity-70 text-red-500 hover:opacity-100 hover:underline duration-100 ease-in-out'
          }
        >
          Error
        </NavLink>
      </nav>
      {/* // todo create dropdown menu for settings */}
      {/* <Button
        as="btn"
        variant="secondary"
        size="small"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Settings
      </Button> */}
      <ThemeToggler />
    </header>
  );
}
