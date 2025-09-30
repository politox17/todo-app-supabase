export default function ShowList({tasks}) {
  
   return(
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Task</th>
            </tr>
        </thead>
        <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.content}</td>
          </tr>
        ))}
        </tbody>
    </table>
   )
}