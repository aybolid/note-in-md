/* eslint-disable @typescript-eslint/no-misused-promises */
import { login } from '@/lib/redux/slices/auth/authThunk';
import { useAppDispatch } from '@/lib/redux/store';
import { UserLoginCredentials } from '@/types/auth';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MdArrowCircleLeft } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import LabeledInput from '../LabeledInput/LabeledInput';
import { validationSchemaLogIn } from './validateSchema';

const LogInForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginCredentials>({
    resolver: yupResolver(validationSchemaLogIn),
  });

  const onSubmit = async (data: UserLoginCredentials) => {
    await dispatch(login(data));
    reset();
  };
  return (
    <form
      className="relative border-2 grid place-items-center border-purple-500 rounded-lg w-full m-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg py-16 px-6 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center text-2xl mb-6">Log In</h2>
      <LabeledInput
        className="mb-2 mt-2"
        labelClassName="mt-6"
        label="Email"
        type="text"
        placeholder="Type your email"
        errors={errors}
        {...register('email')}
      />
      <ErrorMessage
        as={'span'}
        className="text-red-500 text-sm"
        errors={errors}
        name="email"
      />
      <LabeledInput
        className="mb-2 mt-2"
        labelClassName="mt-6"
        label="Password"
        placeholder="Type your password"
        type="password"
        errors={errors}
        {...register('password')}
      />
      <ErrorMessage
        as={'span'}
        className="text-red-500 text-sm"
        errors={errors}
        name="password"
      />

      <NavLink
        className="absolute top-4 left-4 flex items-center transition-colors hover:text-purple-700 "
        to={'/'}
      >
        <MdArrowCircleLeft size={'1.8rem'} />
      </NavLink>

      <Button
        as="btn"
        className="block m-auto mt-12"
        size="medium"
        variant="primary"
        type="submit"
      >
        Log In
      </Button>
      <NavLink
        className=" inline-flex flex-col justify-center items-center mt-4 hover:text-purple-700"
        to={'/auth/signup'}
      >
        <span className="after:opacity-0 hover:after:opacity-100 after:transition-opacity after:w-full after:h-0.5 after:block after:bg-purple-700 after:mt-1 after:rounded-lg">
          Don't have an account? Sign up!
        </span>
      </NavLink>
    </form>
  );
};

export default LogInForm;
