import SearchBar from "../Components/SearchBar";
import Table from "../Components/Table";
import { useState } from "react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Button from "../Components/Button";
import "../styles/AdminUi.css";
import { InputSelect } from "../Components/InputSelect";

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

  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };
  const handlePrevPageClick = () => {
    setCurrentPage((prevState) => prevState - 1);
  };
  const handleLastPageClick = () => {
    setCurrentPage(totalPages);
  };
  const handleNextPageClick = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

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
          <Button
            pagination
            disabled={currentPage === 1}
            onClick={handleFirstPageClick}
          >
            <FirstPageIcon />
          </Button>

          <Button
            pagination
            disabled={currentPage === 1}
            onClick={handlePrevPageClick}
          >
            <NavigateBeforeIcon />
          </Button>

          {pages}

          <Button
            pagination
            disabled={currentPage === totalPages}
            onClick={handleNextPageClick}
          >
            <NavigateNextIcon />
          </Button>

          <Button
            pagination
            disabled={currentPage === totalPages}
            onClick={handleLastPageClick}
          >
            <LastPageIcon />
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

  const handleDeleteClick = () => {
    selectedRows.forEach((row) => {
      deleteRow(row);
    });
    setSelectedRows([]);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <div className="admin-ui">
      <div className="search-by">
        <InputSelect
          label={"Search By:"}
          options={["Name", "Email", "Role"]}
          id="search-by"
          value={searchBy}
          onChange={handleSearchByChange}
        />
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
      <Button onClick={handleDeleteClick}>Delete Selected</Button>

      {Pagination()}
    </div>
  );
}
