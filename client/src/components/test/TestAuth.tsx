import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../stories/Button/Button'

interface FormData {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export default function TestAuth() {
  const { signup, login, logout, authError, user, loading } = useAuth()

  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    signup(formData).catch((err: { message: string }) => console.log(err.message))
  }
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(formData).catch((err: { message: string }) => console.log(err.message))
  }

  return (
    <>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="pass"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="conf pass"
          value={formData.passwordConfirm}
          onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
        />
        <Button type="submit" as="btn" variant="success" size="small" onClick={handleSignup}>
          signup
        </Button>
      </form>
      <hr />
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="pass"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
         <Button type="submit" as="btn" variant="success" size="small" onClick={handleLogin}>
          login
        </Button>
      </form>
      {authError && <p>{authError}</p>}
      {loading && <p>loading...</p>}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button as="btn" variant="danger" size="small" onClick={logout}>
        logout
      </Button>
    </>
  )
}
