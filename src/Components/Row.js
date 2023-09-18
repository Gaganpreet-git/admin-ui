import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import EditView from "./EditView";
import { useState } from "react";

function Row({
  data,
  setUsers,
  id,
  name,
  email,
  role,
  heading,
  selectedRows,
  setSelectedRows,
  deleteRow,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHeadChecked, setIsHeadChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const edit = () => {
    setIsEditing(true);
  };

  const handleEditSave = (editedName, editedEmail) => {
    setUsers((prevState) => {
      let data = [...prevState];
      const target = data.find((obj) => obj.id === id);
      target.name = editedName;
      target.email = editedEmail;
      return data;
    });
    setIsEditing(false);
  };

  const onChangeHandler = (e) => {
    const isChecked = e.target.checked;
    setIsChecked((prevState) => !prevState);
    let data = [...selectedRows];
    if (isChecked) {
      data.push(id);
    } else {
      data = data.filter((row) => row !== id);
    }
    setSelectedRows(data);
    console.log(selectedRows);
  };

  const handleCheckedAll = (e) => {
    const checked = e.target.checked;
    console.log(checked);
    if (checked) {
      setIsHeadChecked(checked);
      let arr = [];
      console.log(data);
      data.forEach((item) => {
        arr.push(item.id);
      });
      setSelectedRows(arr);
    } else {
      setIsHeadChecked(false);
      setSelectedRows([]);
    }
  };

  if (heading) {
    return (
      <tr>
        <th>
          <input
            type="checkbox"
            checked={isHeadChecked}
            onChange={(e) => {
              handleCheckedAll(e);
            }}
          />
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    );
  }

  return (
    <tr className={selectedRows.includes(id)?"active" : null}>
      <td >
        <input
          type="checkbox"
          onChange={onChangeHandler}
          checked={selectedRows.includes(id)}
        />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td className="flex">
        <ModeEditOutlineOutlinedIcon onClick={edit} />
        <DeleteOutlineIcon
          style={{ color: "red" }}
          onClick={() => {
            deleteRow(id);
          }}
        />
      </td>
      {isEditing && (
        <EditView
          setIsEditing={setIsEditing}
          name={name}
          email={email}
          handleSave={handleEditSave}
        />
      )}
    </tr>
  );
}

export default Row;
