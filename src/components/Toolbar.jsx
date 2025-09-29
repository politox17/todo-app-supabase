import MyButton from './MyButton'


export default function Toolbar({onShow, onAdd, onDelete})
{
  return (
    <>
    <MyButton onClick={onShow}>Mostra Lista</MyButton>
    <MyButton onClick={onAdd}>Aggiungi</MyButton>
    <MyButton onClick={onDelete}>Elimina</MyButton>
    </>
  )
}