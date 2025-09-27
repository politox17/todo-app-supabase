import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function showList() {
  return (
    <table>
      <tr>
        <th>Nome task</th>
        <th>Da svolgere entro</th>
      </tr>
    </table>
  )
}


 function MyButton({onClick, children}) {
  return(
    <>
        <button onClick={onClick}>{children}</button>
        
    </>
  )
}

function Toolbar({onShowTask}) {
  return (
    <>
       <MyButton onClick={onShowTask}>Visualizza</MyButton>
       <MyButton>Elimina</MyButton>
       <MyButton>Modifica</MyButton>
       <MyButton>Aggiungi</MyButton>
    </>
  )
}

export default function App() {
 

  return (
    <>
      <h1>Benvenuto!</h1>
      <h3>Scegli cosa fare</h3>
      <Toolbar onShowTask={() => showList()} />
      
    </>
  )
}


