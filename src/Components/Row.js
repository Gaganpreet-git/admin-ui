import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import EditView from "./EditView";
import { useState } from "react";
import CheckBox from "./CheckBox";

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
  // const [isChecked, setIsChecked] = useState(false);

  const handleDeleteClick = () => {
    deleteRow(id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSave = (editedName, editedEmail, editedRole) => {
    setUsers((prevState) => {
      let data = [...prevState];
      const target = data.find((obj) => obj.id === id);
      target.name = editedName;
      target.email = editedEmail;

      if (editedRole !== "select role") {
        target.role = editedRole;
      }
      return data;
    });
    setIsEditing(false);
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    // setIsChecked((prevState) => !prevState);
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
          <CheckBox checked={isHeadChecked} onChange={handleCheckedAll} />
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    );
  }

  return (
    <tr className={selectedRows.includes(id) ? "active" : null}>
      <td>
        <CheckBox
          onChange={handleCheckboxChange}
          checked={selectedRows.includes(id)}
        />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td className="flex">
        <ModeEditOutlineOutlinedIcon onClick={handleEditClick} />
        <DeleteOutlineIcon
          style={{ color: "red" }}
          onClick={handleDeleteClick}
        />
      </td>
      {isEditing && (
        <EditView
          setIsEditing={setIsEditing}
          name={name}
          email={email}
          onSave={handleEditSave}
        />
      )}
    </tr>
  );
}

export default Row;
