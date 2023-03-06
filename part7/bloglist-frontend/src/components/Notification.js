import { useNotificationValue } from '../NotificationContext'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null) {
    return null
  }

  return (
    <Alert variant={notification.error ? 'danger' : 'success'}>
      {notification.message}
    </Alert>
  )
}

export default Notification
