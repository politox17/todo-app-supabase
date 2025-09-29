import {useState} from "react";


export default function AddTask({onAdd})
{
   const [inputValue, setInputValue] = useState('');

   const handleSubmit = async (e) => {
   e.preventDefault();
   if (inputValue.trim() == '') return;
   await onAdd(inputValue.trim());
   setInputValue("");
   }

   return(
    <form onSubmit={handleSubmit}>
        <label>Inserisci task</label>
        <input type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} />
    </form>
   )
}