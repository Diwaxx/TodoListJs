import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

function TaskCard({ todo }) {
  return (
    <li className="task-list__item">
      <Link className="task-card" to={`/task/${todo.id}`}>
        <div className="task-card__header">
          <StatusBadge completed={todo.completed} />
          <p className="task-card__meta">Задача #{todo.id}</p>
        </div>

        <h2 className="task-card__title">{todo.title}</h2>

        <div className="task-card__footer">
          <p className="task-card__meta">Пользователь: {todo.userId}</p>
          <p className="task-card__cta">Открыть детали</p>
        </div>
      </Link>
    </li>
  )
}

export default TaskCard
