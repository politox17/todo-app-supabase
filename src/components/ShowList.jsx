

export default function ShowList({tasks}) {
   return(
    <table>
        <thead>
            <tr>
                <th>Numero</th>
                <th>Task</th>
            </tr>
        </thead>
        <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{task}</td>
          </tr>
        ))}
        </tbody>
    </table>
   )
}