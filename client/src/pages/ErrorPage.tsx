import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-9xl font-bold text-purple-500">
        4<span className="text-purple-700 dark:text-purple-200">0</span>4
      </h1>
      <p className="font-semibold text-3xl mb-4">
        Ooops, Page <span className="text-red-500">Not Found</span>
        <span className="text-3xl ml-2 ">👀</span>
      </p>
      <Button
        as="btn"
        onClick={() => navigate(-1)}
        variant="secondary"
        size="medium"
      >
        Go back to main page
      </Button>
    </div>
  );
}
