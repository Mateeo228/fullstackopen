interface NotifProps {
  notification: string | null;
}

const Notification = ({notification}: NotifProps) => {
  const notifStyle = {
    color: 'red'
  }

  if (notification === null) {
    return null;
  }

  return (
    <p style={notifStyle}>{notification}</p>
  )
}

export default Notification;