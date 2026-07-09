const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'
const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

async function fetchJson(url, errorMessage) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return response.json()
}

export function fetchTodos() {
  return fetchJson(TODOS_URL, 'Не удалось загрузить список задач.')
}

export function fetchUsers() {
  return fetchJson(USERS_URL, 'Не удалось загрузить список пользователей.')
}
