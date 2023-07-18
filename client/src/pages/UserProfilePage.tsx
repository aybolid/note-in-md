import { logout, selectAuth } from '../lib/redux/slices/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../lib/redux/store';
import Button from '../stories/components/Button';

export default function UserProfilePage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  return (
    <>
      <div>UserProfilePage</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button
        as="btn"
        variant="danger"
        size="small"
        onClick={() => dispatch(logout())}
      >
        logout
      </Button>
    </>
  );
}
