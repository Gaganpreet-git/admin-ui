import Row from "./Row";
import '../styles/Table.css'

export default function Table({
  setUsers,
  data,
  users,
  selectedRows,
  setSelectedRows,
  deleteRow,
}) {
  return (
    <table>
      <thead>
        <Row
          heading
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          deleteRow={deleteRow}
          data={data}
        />
      </thead>
      <tbody>
        {data.map((user) => {
          return (
            <Row
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              deleteRow={deleteRow}
              setUsers={setUsers}
              users={users}
              data={data}
            />
          );
        })}
      </tbody>
    </table>
  );
}
