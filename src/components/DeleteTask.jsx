import {useState} from 'react'

export default function DeleteTask({onDel})
{
   const [inputValue, setInputValue] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();
    const index = Number(inputValue) - 1;
    if(isNaN(index || index < 0)) return;

    await onDel(index);
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