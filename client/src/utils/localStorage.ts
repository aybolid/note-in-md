const store = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const get = <T>(key: string): T | null => {
  const value = localStorage.getItem(key)
  return value ? (JSON.parse(value) as T) : null
}

const local = { store, get }

export default local
