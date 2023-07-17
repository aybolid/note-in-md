/* eslint-disable @typescript-eslint/no-misused-promises */
import LabeledInput from '../../stories/LabeledInput/LabeledInput';
import { useForm } from 'react-hook-form';
import { UserSignupCredentials } from '../../types/auth';
import { validationSchema } from './validateSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import Button from '../../stories/components/Button';
import { NavLink } from 'react-router-dom';

const SignUpForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignupCredentials>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: UserSignupCredentials) => {
    console.log(data);
    reset();
  };
  const onClick = () => console.log();
  return (
    <form
      className="border-2 border-purple-500 rounded-lg w-full m-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg py-12 px-6 "
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
        onClick={onClick}
        type="submit"
      >
        Sign Up
      </Button>
      <NavLink
        className="flex justify-center align-middle mt-4"
        to={'/auth/login'}
      >
        Already have an account? Log in!
      </NavLink>
    </form>
  );
};

export default SignUpForm;
