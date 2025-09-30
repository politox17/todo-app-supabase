import MyButton from './MyButton'


export default function Toolbar({onShow, onAdd, onDelete, onLog})
{
  return (
    <>
    <MyButton onClick={onShow}>Mostra</MyButton>
    <MyButton onClick={onAdd}>Aggiungi</MyButton>
    <MyButton onClick={onDelete}>Elimina</MyButton>
    <MyButton onClick={onLog}>Login</MyButton>
    </>
  )
}