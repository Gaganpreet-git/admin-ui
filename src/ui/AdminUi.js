import SearchBar from "../Components/SearchBar";
import Table from "../Components/Table";
import { useState } from "react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Button from "../Components/Button";
import "../styles/AdminUi.css";

export default function AdminUi({ users, setUsers }) {
  const [searchBy, setSearchBy] = useState("name");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const itemsPerPage = 10;
  const endindex = itemsPerPage * currentPage;
  const startIndex = endindex - itemsPerPage;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const data = isFiltered
    ? filteredData.slice(startIndex, endindex)
    : users.slice(startIndex, endindex);

  function Pagination() {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          pagination
          key={i}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </Button>
      );
    }
    return (
      <div className="pagination">
        <div className="pagination__page-count">
          Page {currentPage} of {totalPages}
        </div>

        <div className="pagination__buttons">
          <Button pagination disabled={currentPage === 1}>
            <FirstPageIcon
              onClick={() => {
                setCurrentPage(1);
              }}
            />
          </Button>
          <Button pagination disabled={currentPage === 1}>
            <NavigateBeforeIcon
              onClick={() => {
                setCurrentPage((prevState) => prevState - 1);
              }}
            />
          </Button>
          {pages}
          <Button pagination disabled={currentPage === totalPages}>
            <NavigateNextIcon
              onClick={() => {
                setCurrentPage((prevState) => prevState + 1);
              }}
            />
          </Button>

          <Button pagination disabled={currentPage === totalPages}>
            <LastPageIcon
              onClick={() => {
                setCurrentPage(totalPages);
              }}
            />
          </Button>
        </div>
      </div>
    );
  }

  const filter = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredData([]);
      setIsFiltered(false);
      return;
    }

    const filteredData = users.filter((user) => {
      return user[searchBy].includes(searchTerm);
    });
    console.log(filteredData);
    setFilteredData(filteredData);
    setIsFiltered(true);
  };

  const deleteRow = (id) => {
    setUsers((prevState) => {
      return prevState.filter((user) => {
        return user.id !== id;
      });
    });
  };

  return (
    <div className="admin-ui">
      <div className="search-by">
        <label htmlFor="search-by">Search By:</label>
        <select
          id="search-by"
          value={searchBy}
          onChange={(e) => {
            setSearchBy(e.target.value);
            console.log(searchBy);
          }}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="role">Role</option>
        </select>
      </div>
      <SearchBar
        placeholder={"Search by name,email or role"}
        handleSearch={filter}
      />
      <Table
        users={users}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        deleteRow={deleteRow}
        data={data}
        setUsers={setUsers}
      />
      <Button
        onClick={() => {
          selectedRows.forEach((row) => {
            console.log(row);
            deleteRow(row);
          });
          setSelectedRows([]);
        }}
      >
        Delete Selected
      </Button>

      {Pagination()}
    </div>
  );
}
