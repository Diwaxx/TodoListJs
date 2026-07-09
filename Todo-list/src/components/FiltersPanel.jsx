function FiltersPanel({
  searchQuery,
  statusFilter,
  visibleCount,
  totalCount,
  isFilterActive,
  onSearchChange,
  onStatusFilterChange,
}) {
  const summaryText = isFilterActive
    ? `Найдено задач: ${visibleCount}`
    : `Показано задач: ${visibleCount} из ${totalCount}`

  return (
    <section className="panel filters" aria-label="Фильтры задач">
      <div className="filters__grid">
        <div className="field">
          <label htmlFor="task-search">Поиск по названию</label>
          <input
            id="task-search"
            type="search"
            placeholder="Введите название задачи"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="task-status">Статус</label>
          <select
            id="task-status"
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
          >
            <option value="all">Все</option>
            <option value="completed">Выполненные</option>
            <option value="pending">Невыполненные</option>
          </select>
        </div>
      </div>

      <div className="filters__summary">
        <span>
          <strong>{summaryText}</strong>
        </span>
      </div>
    </section>
  )
}

export default FiltersPanel
