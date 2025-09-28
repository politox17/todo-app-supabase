import { useState } from 'react'
import './App.css'

function ShowList({ tasks }) {
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
function EditTask({onEdit}) {
  const [inputToEdit, setInputEdit] = useState('')

  const handleSubmit = (e) => {
   e.preventDefault();
   if (inputToEdit.trim() !== '') {
    onEdit(Number(inputToEdit) - 1) // uso -1 perché l'indice parte da 0, cmq fa pasring dell'input
    setInputEdit('')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Inserisci ID task da modificare: </label>
      <input
        id="task"
        type="number"
        value={inputToEdit}
        onChange={(e) => setInputEdit(e.target.value)}
      />
      <button type="submit">Modifica</button>
    </form>
  )
}

function DeleteTask({ onDel }) {
  const [inputToDel, setInputToDel] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputToDel.trim() !== '') {
      onDel(Number(inputToDel) - 1) // uso -1 perché l'indice parte da 0, cmq fa pasring dell'input
      setInputToDel('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Inserisci ID task da eliminare: </label>
      <input
        id="task"
        type="number"
        value={inputToDel}
        onChange={(e) => setInputToDel(e.target.value)}
      />
      <button type="submit">Elimina</button>
    </form>
  )
}

function AddTask({ onAdd }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() !== '') {
      onAdd(inputValue)
      setInputValue('')
    }
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

function MyButton({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>
}

function Toolbar({ onShowTask, onAddView, onDelete, onEditing }) {
  return (
    <div>
      <MyButton onClick={onShowTask}>Visualizza</MyButton>
      <MyButton onClick={onDelete}>Elimina</MyButton>
      <MyButton onClick={onEditing}>Modifica</MyButton>
      <MyButton onClick={onAddView}>Aggiungi</MyButton>
    </div>
  )
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [currentView, setCurrentView] = useState(null)

  const handleAddTask = (task) => {
    setTasks([...tasks, task])
    setCurrentView('list')
  }

  const handleDeleteTask = (indexToRemove) => {
    setTasks(tasks.filter((_, i) => i !== indexToRemove))
    setCurrentView('list')
  }

  const handleEditTask = (indexToEdit) => {
    setTasks(tasks.filter((_, i) => i !== indexToEdit))
    setCurrentView('list')
  }

  return (
    <>
      <h1>Benvenuto!</h1>
      <h3>Scegli cosa fare</h3>

      <Toolbar
        onShowTask={() => setCurrentView('list')}
        onAddView={() => setCurrentView('add')}
        onDelete={() => setCurrentView('delete')}
        onEditing={() => setCurrentView('edit')}
      />

      {currentView === 'list' && <ShowList tasks={tasks} />}
      {currentView === 'add' && <AddTask onAdd={handleAddTask} />}
      {currentView === 'delete' && <DeleteTask onDel={handleDeleteTask} />}
      {currentView === 'edit' && <EditTask onEdit={handleEditTask} />}
    </>
  )
}

