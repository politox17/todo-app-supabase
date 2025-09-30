export default function Login({onLog})
{
    return (
        <>
         <form>
            <label htmlFor="log">Inserisci email</label>
            <input type="text"
            id="log" />

            <label htmlFor="log">Inserisci password</label>
            <input type="text"
            id="log" />
            
            <button onClick={supabase.auth.signInWithPassword({ email, password })}>Invia</button>


         </form>
        </>
    )
}