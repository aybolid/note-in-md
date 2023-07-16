import { useAuth } from '../contexts/AuthContext'
import Button from '../stories/components/Button'

export default function UserProfilePage() {
  const { user, logout } = useAuth()

  return (
    <>
      <div>UserProfilePage</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button as="btn" variant="danger" size="small" onClick={logout}>
        logout
      </Button>
    </>
  )
}
