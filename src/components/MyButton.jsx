export default function MyButton({onClick, children}) {
    return <button onClick={onClick}>{children}</button>
}