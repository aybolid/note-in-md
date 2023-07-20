import { selectTheme, setTheme } from '../../lib/redux/slices/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '../../lib/redux/store';
import Button from '../Button/Button';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

const ThemeToggler = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const toggleTheme = () => {
    if (theme.mode === 'dark') {
      dispatch(setTheme('light'));
    } else {
      dispatch(setTheme('dark'));
    }
  };

  return (
    <div className="m-2">
      <Button
        as="btn"
        type="button"
        variant="secondary"
        size="small"
        onClick={toggleTheme}
      >
        {theme.mode === 'dark' ? (
          <MdDarkMode size={'1.5rem'} />
        ) : (
          <MdOutlineDarkMode size={'1.5rem'} />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggler;
