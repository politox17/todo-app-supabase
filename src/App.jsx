import { useState, useEffect } from "react";
import { supabase } from "./services/supabaseConnect";
import Toolbar from "./components/Toolbar";
import ShowList from "./components/ShowList";
import AddTask from "./components/AddTask";
import DeleteTask from "./components/DeleteTask";
import Login from "./components/Login";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState("");
  const [user, setUser] = useState(null);

  // Recupera utente loggato e gestisce auth state changes
  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    
    fetchUser();

    // Listener per cambiamenti di autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Caricare task dal DB per l'utente loggato
  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }
    
    async function fetchTasks() {
      const { data, error } = await supabase
        .from("Tasks")
        .select("id, content, user_id")
        .eq("user_id", user.id);
      if (error) {
        console.error("Errore nella connessione -- ", error);
      } else {
        setTasks(data);
      }
    }
    fetchTasks();
  }, [user]);

  // Aggiungere task
  const handleAddTask = async (task) => {

    if (!user) return;
    const { data, error } = await supabase
      .from("Tasks")
      .insert([{ content: task, user_id: user.id }])
      .select();
    if (!error && data) {
      setTasks((prev) => [...prev, ...data]);
      setCurrentView("list");
    } else {
      console.error("Errore inserimento -- ", error);
    }
  };

  // Eliminare task per id
  const handleDeleteTask = async (taskId) => {
    const { error } = await supabase.from("Tasks").delete().eq("id", taskId);
    if (!error) {
      setTasks(tasks.filter((t) => t.id !== taskId));
      setCurrentView("list");
    } else {
      console.error("Errore eliminazione -- ", error);
    }
  };

  // Gestione login successful
  const handleLoginSuccess = () => {
    setCurrentView("list");
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentView("");
  };

  return (
    <div className="container">
     <h1 className="title">Benvenuto</h1>
      
      {user ? (
        <>
          <h2 className="subtitle-user">Ciao, {user.email}!</h2>
          <button className="button-logout" onClick={handleLogout}>Logout</button>
          <Toolbar
            onShow={() => setCurrentView("list")}
            onAdd={() => setCurrentView("add")}
            onDelete={() => setCurrentView("delete")}
          />
          
          {currentView === "list" && <ShowList tasks={tasks} />}
          {currentView === "add" && <AddTask onAdd={handleAddTask} />}
          {currentView === "delete" && (
            <DeleteTask onDel={handleDeleteTask} tasks={tasks} />
          )}
        </>
      ) : (
        <>
          <h2 className="subtitle">Prima di svolgere operazioni devi autenticarti</h2>
          <Toolbar onLog={() => setCurrentView("login")} />
          
          {currentView === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
        </>
      )}
    </div>
  );
}