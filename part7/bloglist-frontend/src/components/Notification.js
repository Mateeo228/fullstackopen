import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  // eslint-disable-next-line no-unused-vars
  const notification = useNotificationValue()

  if (notification === null) {
    return null
  }

  return (
    <div className={notification.error ? 'error' : 'success'}>
      {notification.message}
    </div>
  )
}

export default Notification
