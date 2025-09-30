import { useState, useEffect } from "react";
import { supabase } from "./supabaseConnect";
import Toolbar from "./components/Toolbar";
import ShowList from "./components/ShowList";
import AddTask from "./components/AddTask";
import DeleteTask from "./components/DeleteTask";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState("");
  const [user, setUser] = useState(null);

  // Recupera utente loggato
  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Errore utente -- ", error);
      } else {
        setUser(data.user);
      }
    }
    fetchUser();
  }, []);

  // Caricare task dal DB per l'utente loggato
  useEffect(() => {
    if (!user) return;
    async function fetchTasks() {
      const { data, error } = await supabase
        .from("Tasks")
        .select("*")
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

  return (
    <>
      <h1>Benvenuto</h1>
      <h3>Scegli cosa fare.</h3>

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
  );
}
