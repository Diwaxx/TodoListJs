import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import StateMessage from '../components/StateMessage'
import StatusBadge from '../components/StatusBadge'

function TodoDetailsPage({
  ensureUsersLoaded,
  todos,
  todosErrorMessage,
  todosStatus,
  users,
  usersErrorMessage,
  usersStatus,
}) {
  const { taskId } = useParams()
  const parsedTaskId = Number(taskId)

  useEffect(() => {
    if (todosStatus === 'success' && usersStatus === 'idle') {
      ensureUsersLoaded()
    }
  }, [ensureUsersLoaded, todosStatus, usersStatus])

  if (todosStatus === 'loading') {
    return (
      <main className="page">
        <StateMessage
          title="Загружаем задачу"
          message="Сначала получим список задач, а затем откроем нужную карточку."
        />
      </main>
    )
  }

  if (todosStatus === 'error') {
    return (
      <main className="page">
        <StateMessage
          title="Не удалось открыть задачу"
          message={todosErrorMessage}
        >
          <Link className="link-button" to="/">
            Вернуться к списку
          </Link>
        </StateMessage>
      </main>
    )
  }

  if (!Number.isInteger(parsedTaskId) || parsedTaskId < 1) {
    return (
      <main className="page">
        <StateMessage
          title="Некорректный адрес"
          message="Идентификатор задачи в адресной строке указан неверно."
        >
          <Link className="link-button" to="/">
            Вернуться к списку
          </Link>
        </StateMessage>
      </main>
    )
  }

  const todo = todos.find((item) => item.id === parsedTaskId)

  if (!todo) {
    return (
      <main className="page">
        <StateMessage
          title="Задача не найдена"
          message="Похоже, такой задачи нет в полученном списке."
        >
          <Link className="link-button" to="/">
            Вернуться к списку
          </Link>
        </StateMessage>
      </main>
    )
  }

  const user = users.find((item) => item.id === todo.userId)

  return (
    <main className="page">
      <div>
        <Link className="link-button" to="/">
          Вернуться к списку
        </Link>
      </div>

      <article className="panel details-card">
        <div className="details-card__top">
          <div>
            <p className="page__eyebrow">Карточка задачи</p>
            <h1 className="details-card__title">{todo.title}</h1>
          </div>
          <StatusBadge completed={todo.completed} />
        </div>

        <section className="details-grid" aria-label="Основные данные задачи">
          <div className="details-item">
            <p className="details-item__label">ID задачи</p>
            <p className="details-item__value">{todo.id}</p>
          </div>
          <div className="details-item">
            <p className="details-item__label">ID пользователя</p>
            <p className="details-item__value">{todo.userId}</p>
          </div>
        </section>

        <section className="details-section" aria-label="Данные пользователя">
          <h2 className="details-section__title">Пользователь</h2>

          {usersStatus === 'loading' && (
            <p className="details-section__text">
              Загружаем имя и email пользователя...
            </p>
          )}

          {usersStatus === 'error' && (
            <p className="details-section__text">{usersErrorMessage}</p>
          )}

          {usersStatus === 'success' && user && (
            <>
              <p className="details-section__text">Имя: {user.name}</p>
              <p className="details-section__text">Email: {user.email}</p>
            </>
          )}

          {usersStatus === 'success' && !user && (
            <p className="details-section__text">
              Пользователь для этой задачи не найден.
            </p>
          )}

          {usersStatus === 'idle' && (
            <p className="inline-note">Данные пользователя будут загружены автоматически.</p>
          )}
        </section>
      </article>
    </main>
  )
}

export default TodoDetailsPage
