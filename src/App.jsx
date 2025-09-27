import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Benvenuto!</h1>
      <h3>Scegli cosa fare</h3>
      <button>Visualizza</button>
      <button>Rimuovi</button>
      <button>Modifica</button>
      <button>Aggiungi</button>
    </>
  )
}

export default App
