import { useState } from 'react'
import './App.css'

// COMPONENTE: Mostra lista task
function ShowList({ tasks }) {
  if (tasks.length === 0) {
    return <p>⚠ Nessuna task trovata.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Numero</th>
          <th>Task</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{task}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// COMPONENTE: Aggiunta task con validazione
function AddTask({ onAdd, setMessage }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // 1️⃣ VALIDAZIONE: se vuoto → errore
    if (inputValue.trim() === '') {
      setMessage({ type: 'error', text: 'La task non può essere vuota!' })
      return
    }

    // 2️⃣ VALIDAZIONE: se troppo corta → errore
    if (inputValue.trim().length < 3) {
      setMessage({ type: 'error', text: 'La task deve avere almeno 3 caratteri.' })
      return
    }

    // ✅ Se tutto ok → aggiungi task
    onAdd(inputValue.trim())
    setMessage({ type: 'success', text: 'Task aggiunta con successo ✅' })
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Inserisci task:</label>
      <input
        id="task"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Aggiungi</button>
    </form>
  )
}

// COMPONENTE: Eliminazione task con validazione
function DeleteTask({ onDel, taskCount, setMessage }) {
  const [inputToDel, setInputToDel] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const index = Number(inputToDel) - 1 // converte in indice (0-based)

    // 1️⃣ VALIDAZIONE: se non numero → errore
    if (isNaN(index) || inputToDel.trim() === '') {
      setMessage({ type: 'error', text: 'Devi inserire un numero valido!' })
      return
    }

    // 2️⃣ VALIDAZIONE: se numero fuori range → errore
    if (index < 0 || index >= taskCount) {
      setMessage({ type: 'error', text: 'ID task non valido.' })
      return
    }

    // ✅ Se tutto ok → elimina
    onDel(index)
    setMessage({ type: 'success', text: 'Task eliminata con successo ✅' })
    setInputToDel('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="delTask">ID task da eliminare:</label>
      <input
        id="delTask"
        type="number"
        value={inputToDel}
        onChange={(e) => setInputToDel(e.target.value)}
      />
      <button type="submit">Elimina</button>
    </form>
  )
}

// BOTTONI
function MyButton({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>
}

function Toolbar({ onShowTask, onAddView, onDelete }) {
  return (
    <div>
      <MyButton onClick={onShowTask}>Visualizza</MyButton>
      <MyButton onClick={onDelete}>Elimina</MyButton>
      <MyButton onClick={onAddView}>Aggiungi</MyButton>
    </div>
  )
}

// COMPONENTE PRINCIPALE
export default function App() {
  const [tasks, setTasks] = useState([])
  const [currentView, setCurrentView] = useState(null)
  const [message, setMessage] = useState(null) // { type: 'error' | 'success', text: '...' }

  const handleAddTask = (task) => {
    setTasks([...tasks, task])
    setCurrentView('list')
  }

  const handleDeleteTask = (indexToRemove) => {
    setTasks(tasks.filter((_, i) => i !== indexToRemove))
    setCurrentView('list')
  }

  return (
    <>
      <h1>Benvenuto!</h1>
      <h3>Scegli cosa fare</h3>

      {/* MESSAGGIO DINAMICO */}
      {message && (
        <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.text}
        </p>
      )}

      {/* TOOLBAR */}
      <Toolbar
        onShowTask={() => setCurrentView('list')}
        onAddView={() => setCurrentView('add')}
        onDelete={() => setCurrentView('delete')}
      />

      {/* RENDER CONDIZIONALE DELLE VISTE */}
      {currentView === 'list' && <ShowList tasks={tasks} />}
      {currentView === 'add' && <AddTask onAdd={handleAddTask} setMessage={setMessage} />}
      {currentView === 'delete' && (
        <DeleteTask
          onDel={handleDeleteTask}
          taskCount={tasks.length}
          setMessage={setMessage}
        />
      )}
    </>
  )
}
