

export default function MyButton({onClick, child}) {
    return <button onClick={onClick}>{child}</button>
}