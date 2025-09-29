import { useState } from 'react'
import './App.css'
import { supabase } from "./supabaseConnect"; // 👈 Nuovo: import del client Supabase (anche se ancora non usato)


// COMPONENTE: Mostra lista task
function ShowList({ tasks }) {
  // 👇 Controllo: se l'array tasks è vuoto, mostro un messaggio
  if (tasks.length === 0) {
    return <p> Nessuna task trovata.</p> // 👈 UX migliorata (feedback utente)
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
            {/* 👇 Uso index+1 per mostrare ID leggibile (parte da 1) */}
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

    // ✅ VALIDAZIONE: task non può essere vuota
    if (inputValue.trim() === '') {
      setMessage({ type: 'error', text: 'La task non può essere vuota!' })
      return
    }

    // ✅ VALIDAZIONE: task deve avere almeno 3 caratteri
    if (inputValue.trim().length < 3) {
      setMessage({ type: 'error', text: 'La task deve avere almeno 3 caratteri.' })
      return
    }

    // 👇 Aggiungo la task (passata al componente padre)
    onAdd(inputValue.trim())

    // ✅ Feedback utente: messaggio di successo
    setMessage({ type: 'success', text: 'Task aggiunta con successo ' })

    // 👇 Pulisco l'input
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Inserisci task:</label>
      <input
        id="task"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // 👈 Input controllato
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
    const index = Number(inputToDel) - 1 // 👈 Converto in numero e passo a indice 0-based

    // ✅ Validazione: se non è numero valido → errore
    if (isNaN(index) || inputToDel.trim() === '') {
      setMessage({ type: 'error', text: 'Devi inserire un numero valido!' })
      return
    }

    // ✅ Validazione: se fuori range → errore
    if (index < 0 || index >= taskCount) {
      setMessage({ type: 'error', text: 'ID task non valido.' })
      return
    }

    // 👇 Chiamo il parent per cancellare la task
    onDel(index)

    // ✅ Messaggio di successo
    setMessage({ type: 'success', text: 'Task eliminata con successo' })

    // 👇 Reset input
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


// Toolbar (pulsanti)
function Toolbar({ onShowTask, onAddView, onDelete }) {
  return (
    <div>
      {/* 👇 Ogni bottone setta currentView nello stato del parent */}
      <MyButton onClick={onShowTask}>Visualizza</MyButton>
      <MyButton onClick={onDelete}>Elimina</MyButton>
      <MyButton onClick={onAddView}>Aggiungi</MyButton>
    </div>
  )
}


// COMPONENTE PRINCIPALE
export default function App() {
  const [tasks, setTasks] = useState([]) // 👈 Stato che contiene la lista task
  const [currentView, setCurrentView] = useState(null) // 👈 "list", "add", "delete"
  const [message, setMessage] = useState(null) // 👈 Stato per i messaggi dinamici { type, text }

  const handleAddTask = (task) => {
    // 👇 Aggiorno array tasks aggiungendo la nuova task
    setTasks([...tasks, task])

    // 👇 Torno alla lista
    setCurrentView('list')
  }

  const handleDeleteTask = (indexToRemove) => {
    // 👇 Creo un nuovo array filtrando via la task con quell'indice
    setTasks(tasks.filter((_, i) => i !== indexToRemove))

    // 👇 Torno alla lista
    setCurrentView('list')
  }

  return (
    <>
      <h1>Benvenuto!</h1>
      <h3>Scegli cosa fare</h3>

      {/* ✅ MESSAGGIO DINAMICO: appare solo se message !== null */}
      {message && (
        <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.text}
        </p>
      )}

      {/* ✅ Toolbar che cambia currentView */}
      <Toolbar
        onShowTask={() => setCurrentView('list')}
        onAddView={() => setCurrentView('add')}
        onDelete={() => setCurrentView('delete')}
      />

      {/* ✅ Rendering condizionale delle viste */}
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
