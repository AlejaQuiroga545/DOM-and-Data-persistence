// Este archivo ahora usa localStorage para la persistencia de datos
const LOCAL_STORAGE_KEY = "student_data"

// Genera un ID único simple para cada estudiante
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Create a new user (POST - simulado con localStorage)
export async function createUser(name, age) {
  return new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]")
    const newUser = { id: generateId(), name, age: Number.parseInt(age) }
    users.push(newUser)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users)) // setItem()
    setTimeout(resolve, 100) // Simula un retardo de red
  })
}

// Get all users (GET - simulado con localStorage)
export async function getUsers() {
  return new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") // getItem()
    setTimeout(() => resolve(users), 100) // Simula un retardo de red
  })
}

// Delete all users (DELETE - simulado con localStorage)
export async function deleteAllUsers() {
  return new Promise((resolve) => {
    localStorage.removeItem(LOCAL_STORAGE_KEY) // removeItem()
    // Opcional: localStorage.setItem(LOCAL_STORAGE_KEY, "[]"); para asegurar que siempre haya un array vacío
    setTimeout(resolve, 100) // Simula un retardo de red
  })
}

// Track session interaction (usa sessionStorage)
export function trackSessionInteractions() {
  let count = Number(sessionStorage.getItem("interactions") || "0") // getItem()
  count++
  sessionStorage.setItem("interactions", count.toString()) // setItem()
  return count
}