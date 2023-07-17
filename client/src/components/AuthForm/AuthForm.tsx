/* eslint-disable @typescript-eslint/no-misused-promises */
import { useParams } from 'react-router-dom'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'

const AuthForm = () => {
  const { action } = useParams()

  return (
    <div className="w-full px-4 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      {action === 'login' ? <LogInForm /> : <SignUpForm />}
    </div>
  )
}

export default AuthForm
