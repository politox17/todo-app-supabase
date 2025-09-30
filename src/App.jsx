import { useEffect, useState } from "react";
import { supabase } from "./services/supabaseConnect";
import ShowList from "./components/ShowList";
import AddTask from "./components/AddTask";
import DeleteTask from "./components/DeleteTask";
import Toolbar from "./components/Toolbar";
import MyButton from "./components/MyButton";


export default function App() {
  const [tasks, setTask] = useState([])
  const [currentView, setCurrentView] = useState('')
  const { data: { user } } = await supabase.auth.getUser()



  // Caricare task dal DB
  useEffect(() => {
    async function fetchTasks() {
      const {data, error} = await supabase.from("Tasks").select("*").eq('user_id', user.id);
      if (error) {
        console.error("Errore nella connessione -- ", error);
      } else {
        setTask(data.map((t) => t.content));
      }
    }
    fetchTasks();
  }, []);

  // Aggiungere task
  const handleAddTask = async (task) => {
    const { error } = await supabase.from("Tasks").insert([{ content: task }]); // Aggiunge testo
    if (!error) {
      setTask((prev) => [...prev, task]);
      setCurrentView("list");
    } else {
      console.error("Errore inserimento -- ", error);
    }
  };

  const handleDeleteTask = async (indexToRemove) => {
    const taskToDelete = tasks[indexToRemove];
    const { error } = await supabase.from("Tasks").delete().eq("content", taskToDelete);
    if (!error) {
      setTask(tasks.filter((_, i) => i !== indexToRemove));
      setCurrentView("list");
    } else {
      console.error("Errore eliminazione -- ", error);
    }

  };

  return(
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
      {currentView === "delete" && <DeleteTask onDel={handleDeleteTask} />}
    </>
  )
}