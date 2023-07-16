/* eslint-disable @typescript-eslint/no-misused-promises */
import TestAuth from '../components/test/TestAuth'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, useParams, NavLink } from 'react-router-dom'
import LabeledInput from '../stories/LabeledInput/LabeledInput'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  test: string
  test2: string
}

export default function AuthPage() {
  const { user } = useAuth()
  const { action } = useParams()
  const { register, handleSubmit } = useForm<Inputs>()

  if (user) {
    return <Navigate to="/" />
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <>
      <div>AuthPage</div>
      <p>Action: {action}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabeledInput label="Test" type="text" {...register('test')} />
        <LabeledInput label="Test" type="text" {...register('test2')} />

        <button type="submit">SUBMIT</button>
      </form>
      <div>
        <NavLink to={`/auth/${action === 'login' ? 'signup' : 'login'}`}>
          {action === 'login' ? 'signup link' : 'login link'}
        </NavLink>
      </div>
    </>
  )
}
