# 🎓 Student Registration SPA

A lightweight and responsive Single Page Application (SPA) built with HTML, CSS, JavaScript, and `json-server`. This app allows you to register students by name and age, visualize stored data, and manage user sessions interactively.

---

## ✨ Features

✅ Register student name and age  
✅ Store data in a mock backend using `db.json`
✅ Display a live list of registered students  
✅ Clear all students with one click  
✅ Session counter to track how many were added    
✅ Real-time alerts and validations with SweetAlert2✅
✅ Fully commented code to understand every part
✅ Responsive layout for mobile, tablet and desktop  
✅ Smooth animations and visual effects

---

## 💻 Tech Stack

| Language | Use |
|----------|-----|
| HTML     | Structure of the form and layout |
| CSS      | Styling and responsive design |
| JavaScript | Functionality and DOM manipulation |
| SweetAlert2 | Alert pop-ups for validation |

---

## 🚀 How to Run

1. Clone this repository  
2. Install dependencies  
   ```bash
   npm install
   ```
3. Start json-server:
   ```bash
   npx json-server --watch db/db.json --port 3000
   ```
4. Start development server with Vite:
   ```bash
   npm run dev
   ```
5. Open your browser at:
   ```bash
   npm run dev http://localhost:5173
   ```

---

## 📋 Notes
- All backend logic (GET, POST, DELETE) is written inside `services.js`
- `script.js` handles DOM updates, form logic, and session tracking
- Student data is stored in `db.json`, simulating a real backend
- UI feedback and validations are handled using SweetAlert2

---

### SweetAlert2

👩‍💻 Author
Created with 💜 by Aleja Quiroga
