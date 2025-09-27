import { useState } from 'react'
import './App.css'

function ShowList() {
  return (
    <table>
      <thead>
        <tr>
          <th>Numero</th>
          <th>Task</th>
        </tr>
      </thead>
      <tbody>
        {/* Qui inserirai i task */}
      </tbody>
    </table>
  )
}

function AddTask() {

}

function MyButton({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>
}

function Toolbar({ onShowTask, onAdd }) {
  return (
    <div>
      <MyButton onClick={onShowTask}>Visualizza</MyButton>
      <MyButton>Elimina</MyButton>
      <MyButton>Modifica</MyButton>
      <MyButton onClick={onAdd}>Aggiungi</MyButton>
    </div>
  )
}

export default function App() {
  const [isListVisible, setIsListVisible] = useState(false) // App tiene uno stato

  return (
    <>
      <h1>Benvenuto!</h1>
      <h3>Scegli cosa fare</h3>
      <Toolbar onShowTask={() => setIsListVisible(true)} /> {/* Lo setta su true */}
      {isListVisible && <ShowList />} {/* se è true lo reinderizza */}
    </>
  )
}
