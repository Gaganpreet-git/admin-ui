import { useState } from "react";
import Button from "./Button";
import "../styles/EditView.css";
import InputText from "./InputText";
import { InputSelect } from "./InputSelect";

export default function EditView({ name, email, onSave, setIsEditing }) {
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedRole, setEditedRole] = useState("select role");

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };
  const handleOptionChange = (e) => {
    console.log(e.target.value);
    setEditedRole(e.target.value);
  };

  const handleSave = () => {
    onSave(editedName, editedEmail, editedRole);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="edit-view">
      <div className="edit-view-inner">
        <h4>Edit Details:</h4>
        <InputText
          value={editedName ? editedName : name}
          onChange={handleNameChange}
        />
        <InputText
          value={editedEmail ? editedEmail : email}
          onChange={handleEmailChange}
        />

        <InputSelect
          options={["Select Role", "admin", "member"]}
          onChange={handleOptionChange}
        />
        <div className="edit-view-buttons">
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
