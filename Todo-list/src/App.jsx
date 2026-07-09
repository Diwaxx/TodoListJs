import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { fetchTodos, fetchUsers } from './api/todos'
import TodoDetailsPage from './pages/TodoDetailsPage'
import TodoListPage from './pages/TodoListPage'
import './App.css'

const INITIAL_VISIBLE_TODOS = 15

function App() {
  const [todos, setTodos] = useState([])
  const [todosStatus, setTodosStatus] = useState('loading')
  const [todosErrorMessage, setTodosErrorMessage] = useState('')
  const [users, setUsers] = useState([])
  const [usersStatus, setUsersStatus] = useState('idle')
  const [usersErrorMessage, setUsersErrorMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    async function loadTodos() {
      try {
        setTodosStatus('loading')
        setTodosErrorMessage('')

        const todosData = await fetchTodos()

        setTodos(todosData)
        setTodosStatus('success')
      } catch (error) {
        setTodosStatus('error')
        setTodosErrorMessage(error.message)
      }
    }

    loadTodos()
  }, [])

  async function ensureUsersLoaded() {
    if (usersStatus === 'loading' || usersStatus === 'success') {
      return
    }

    try {
      setUsersStatus('loading')
      setUsersErrorMessage('')

      const usersData = await fetchUsers()

      setUsers(usersData)
      setUsersStatus('success')
    } catch (error) {
      setUsersStatus('error')
      setUsersErrorMessage(error.message)
    }
  }

  const normalizedSearchQuery = searchQuery.trim().toLowerCase()
  const isFilterActive = normalizedSearchQuery !== '' || statusFilter !== 'all'
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      normalizedSearchQuery === '' ||
      todo.title.toLowerCase().includes(normalizedSearchQuery)
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && todo.completed) ||
      (statusFilter === 'pending' && !todo.completed)

    return matchesSearch && matchesStatus
  })
  const visibleTodos = isFilterActive
    ? filteredTodos
    : filteredTodos.slice(0, INITIAL_VISIBLE_TODOS)

  return (
    <div className="app-shell">
      <Routes>
        <Route
          path="/"
          element={
            <TodoListPage
              isFilterActive={isFilterActive}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              todos={visibleTodos}
              totalTodos={todos.length}
              filteredTodosCount={filteredTodos.length}
              todosErrorMessage={todosErrorMessage}
              todosStatus={todosStatus}
              onSearchChange={setSearchQuery}
              onStatusFilterChange={setStatusFilter}
            />
          }
        />
        <Route
          path="/task/:taskId"
          element={
            <TodoDetailsPage
              ensureUsersLoaded={ensureUsersLoaded}
              todos={todos}
              todosErrorMessage={todosErrorMessage}
              todosStatus={todosStatus}
              users={users}
              usersErrorMessage={usersErrorMessage}
              usersStatus={usersStatus}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
