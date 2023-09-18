import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminUi from "./ui/AdminUi";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const onLoad = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData.data);
    };
    onLoad();
  }, []);

  const fetchUsers = async () => {
    try {
      const API_URL = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;
      const res = await axios.get(API_URL);
      return res;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="App">
      <AdminUi users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
