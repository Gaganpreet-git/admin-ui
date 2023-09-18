import { useState } from "react";
import Button from "./Button";
import '../styles/EditView.css'
export default function EditView({ name, email, handleSave, setIsEditing }) {
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  return (
    <div className="edit-view">
      <div className="edit-view-inner">
        <input
          type="text"
          value={editedName ? editedName : name}
          onChange={(e) => {
            setEditedName(e.target.value);
          }}
        />
        <input
          type="text"
          value={editedEmail ? editedEmail : email}
          onChange={(e) => {
            setEditedEmail(e.target.value);
          }}
        />
        <select>
          <option>admin</option>
          <option>member</option>
        </select>
        <div className="edit-view-buttons">
        <Button
          onClick={() => {
            handleSave(editedName, editedEmail);
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Close
        </Button></div>
      </div>
    </div>
  );
}
