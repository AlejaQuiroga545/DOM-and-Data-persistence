import { createUser, getUsers, deleteAllUsers, trackSessionInteractions } from "./services.js"
import Swal from "sweetalert2"

const form = document.getElementById("userForm")
const nameInput = document.getElementById("nameInput")
const ageInput = document.getElementById("ageInput")
const userDataDiv = document.getElementById("userData")
const clearBtn = document.getElementById("clearBtn")
const loadBtn = document.getElementById("loadBtn")
const sessionCounter = document.querySelector(".sessionCounter")

// Show all users on load
window.addEventListener("DOMContentLoaded", async () => {
  await displayAllUsers()
  displaySessionCount()
})

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const name = nameInput.value.trim()
  const age = ageInput.value.trim()

  if (!name || !age || isNaN(age) || age < 0) {
    Swal.fire({
      icon: "error",
      title: "Invalid input",
      text: "Please enter a valid name and age.",
    })
    return
  }

  try {
    await createUser(name, age)
    Swal.fire({
      icon: "success",
      title: "User saved!",
      text: "The user was successfully added.",
    })
    form.reset()
    await displayAllUsers()
    displaySessionCount()
  } catch (error) {
    console.error(error)
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to save user.",
    })
  }
})

// Display all stored users (DEMOSTRACIÓN DE MANIPULACIÓN DEL DOM)
async function displayAllUsers() {
  try {
    const users = await getUsers()
    // Limpia el contenido actual del contenedor
    userDataDiv.innerHTML = "" // Demostración de cómo limpiar un elemento

    if (users.length === 0) {
      // Si no hay estudiantes, añade el mensaje de placeholder
      const noStudentsMessage = document.createElement("p") // Crea un nuevo elemento <p>
      noStudentsMessage.className = "no-students-message" // Asigna la clase CSS
      noStudentsMessage.innerHTML = `
        <span class="empty-icon">📚</span>
        No students registered yet.
        <span class="empty-subtitle">Add your first student to get started!</span>
      `
      userDataDiv.appendChild(noStudentsMessage) // Añade el elemento al DOM
    } else {
      // Si hay estudiantes, crea y añade un <p> por cada uno
      users.forEach((user) => {
        const userParagraph = document.createElement("p") // Crea un nuevo elemento <p>
        userParagraph.textContent = `${user.name} - ${user.age} years old.` // Cambia el texto del elemento
        userParagraph.className = "user-entry" // Puedes añadir una clase si quieres estilos específicos
        userDataDiv.appendChild(userParagraph) // Añade el elemento al DOM
      })
    }
  } catch (error) {
    console.error(error)
    userDataDiv.textContent = "Failed to load users."
  }
}

// Clear all users on button click
clearBtn.addEventListener("click", async () => {
  try {
    await deleteAllUsers()
    Swal.fire({
      icon: "info",
      title: "Cleared",
      text: "All users have been deleted.",
    })
    await displayAllUsers() // Refresca la lista para mostrar el mensaje de "no estudiantes"
    displaySessionCount()
  } catch (error) {
    console.error(error)
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Could not clear users.",
    })
  }
})

// Cargar todos los usuarios al hacer clic en el botón
loadBtn.addEventListener("click", async () => {
  try {
    await displayAllUsers()
    Swal.fire({
      icon: "info",
      title: "Loaded",
      text: "Student data has been refreshed.",
    })
    displaySessionCount()
  } catch (error) {
    console.error(error)
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Could not load users.",
    })
  }
})

// Show session counter
function displaySessionCount() {
  const count = trackSessionInteractions()
  sessionCounter.textContent = `${count}`
}

// Inicializa el contador de interacciones en 0 al cargar la página por primera vez
// Esto asegura que el contador de sesión se reinicie con cada nueva sesión/pestaña
sessionStorage.setItem("interactions", "0")
displaySessionCount() // Llama una vez para mostrar el 0 inicial y luego se incrementará con cada interacción