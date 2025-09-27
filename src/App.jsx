import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function myButton() {
  return(
    <>
    <button>Visualizza</button>
    <button>Rimuovi</button>
    <button>Modifica</button>
    <button>Aggiungi</button>
    
    </>
  )
}

function App() {
 

  return (
    <>
      <h1>Benvenuto!</h1>
      <h3>Scegli cosa fare</h3>
      <myButton />
    </>
  )
}

export default App
