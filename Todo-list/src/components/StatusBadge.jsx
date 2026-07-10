function StatusBadge({ completed }) {
  return (
    <span
      className={`status-badge ${
        completed ? 'status-badge--completed' : 'status-badge--pending'
      }`}
    >
      {completed ? 'Выполнена' : 'Не выполнена'}
    </span>
  )
}

export default StatusBadge
