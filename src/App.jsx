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

function Toolbar({ onShowTask, onAddView }) {
  return (
    <div>
      <MyButton onClick={onShowTask}>Visualizza</MyButton>
      <MyButton>Elimina</MyButton>
      <MyButton>Modifica</MyButton>
      <MyButton onClick={onAddView}>Aggiungi</MyButton>
    </div>
  )
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [currentView, setCurrentView] = useState(null) // 'list' | 'add' | null

  const handleAddTask = (task) => {
    setTasks([...tasks, task])
    setCurrentView('list') // torna automaticamente alla lista dopo aver aggiunto
  }

  return (
    <>
      <h1>Benvenuto!</h1>
      <h3>Scegli cosa fare</h3>
      <Toolbar
        onShowTask={() => setCurrentView('list')}
        onAddView={() => setCurrentView('add')}
      />

      {currentView === 'list' && <ShowList tasks={tasks} />}
      {currentView === 'add' && <AddTask onAdd={handleAddTask} />}
    </>
  )
}
