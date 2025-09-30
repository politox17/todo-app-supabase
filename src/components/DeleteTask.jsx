import {useState} from 'react'

export default function DeleteTask({onDel})
{
   const [inputValue, setInputValue] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Number(inputValue);
    if (isNaN(id) || id <= 0) return;

    await onDel(id);
    setInputValue('');
   }

   return (
    <form onSubmit={handleSubmit}>
        <label >ID task da eliminare</label>
        <input type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)} />
        <button>Elimina</button>
    </form>
   )

}