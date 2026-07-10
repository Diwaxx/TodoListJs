import FiltersPanel from '../components/FiltersPanel'
import StateMessage from '../components/StateMessage'
import TaskCard from '../components/TaskCard'

function TodoListPage({
  isFilterActive,
  searchQuery,
  statusFilter,
  todos,
  totalTodos,
  filteredTodosCount,
  todosErrorMessage,
  todosStatus,
  onSearchChange,
  onStatusFilterChange,
}) {
  return (
    <main className="page">
      <header className="page__header">
        <p className="page__eyebrow">Todo List</p>
        <h1 className="page__title">Список задач</h1>
      </header>

      <FiltersPanel
        isFilterActive={isFilterActive}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        totalCount={totalTodos}
        visibleCount={isFilterActive ? filteredTodosCount : todos.length}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
      />

      {todosStatus === 'loading' && (
        <StateMessage
          title="Загружаем задачи"
          message="Получаем список задач"
        />
      )}

      {todosStatus === 'error' && (
        <StateMessage
          title="Не удалось загрузить задачи"
          message={todosErrorMessage}
        />
      )}

      {todosStatus === 'success' && todos.length === 0 && (
        <StateMessage
          title="Ничего не найдено"
          message="Попробуйте изменить строку поиска или переключить фильтр статуса."
        />
      )}

      {todosStatus === 'success' && todos.length > 0 && (
        <section aria-label="Список задач">
          <ul className="task-list">
            {todos.map((todo) => (
              <TaskCard key={todo.id} todo={todo} />
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default TodoListPage
