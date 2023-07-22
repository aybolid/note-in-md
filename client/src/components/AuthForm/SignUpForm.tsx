/* eslint-disable @typescript-eslint/no-misused-promises */
import LabeledInput from '../LabeledInput/LabeledInput';
import { useForm } from 'react-hook-form';
import { UserSignupCredentials } from '../../types/auth';
import { validationSchemaSignUp } from './validateSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import Button from '../Button/Button';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../lib/redux/store';
import { signup } from '../../lib/redux/slices/auth/authThunk';
import { MdArrowCircleLeft } from 'react-icons/md';

const SignUpForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignupCredentials>({
    resolver: yupResolver(validationSchemaSignUp),
  });

  const onSubmit = async (data: UserSignupCredentials) => {
    await dispatch(signup(data));
    reset();
  };
  return (
    <form
      className="relative border-2 grid place-items-center border-purple-500 rounded-lg w-full m-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg py-12 px-6 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center text-2xl mb-6">Sign Up</h2>
      <LabeledInput
        className={`mb-2 mt-2`}
        labelClassName="mt-6"
        label="Name"
        type="text"
        errors={errors}
        placeholder="Type your name"
        {...register('name')}
      />
      <ErrorMessage
        as={'span'}
        className="text-red-500 text-sm"
        errors={errors}
        name="name"
      />
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
      <LabeledInput
        className="mb-2 mt-2"
        labelClassName="mt-6"
        label="Confirm Password "
        placeholder="Confirm your password"
        type="password"
        errors={errors}
        {...register('passwordConfirm')}
      />
      <ErrorMessage
        as={'span'}
        className="text-red-500 text-sm"
        errors={errors}
        name="passwordConfirm"
      />
      <Button
        as="btn"
        className="block m-auto mt-12"
        size="medium"
        variant="primary"
        type="submit"
      >
        Sign Up
      </Button>
      <NavLink
        className="absolute top-4 left-4 flex items-center transition-colors hover:text-purple-700 "
        to={'/'}
      >
        <MdArrowCircleLeft size={'1.8rem'} />
      </NavLink>
      <NavLink
        className=" inline-flex flex-col justify-center items-center mt-4 hover:text-purple-700"
        to={'/auth/login'}
      >
        <span className="after:opacity-0 hover:after:opacity-100 after:transition-opacity after:w-full after:h-0.5 after:block after:bg-purple-700 after:mt-1 after:rounded-lg">
          Already have an account? Log in!
        </span>
      </NavLink>
    </form>
  );
};

export default SignUpForm;
