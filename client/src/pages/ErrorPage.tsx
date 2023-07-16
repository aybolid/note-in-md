import { useNavigate } from 'react-router-dom'
import Button from '../stories/components/Button'

export default function ErrorPage() {
  // todo useRouterError()
  const navigate = useNavigate()

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Button as="btn" onClick={() => navigate(-1)} variant="secondary" size="small">
        Go back
      </Button>
    </div>
  )
}
