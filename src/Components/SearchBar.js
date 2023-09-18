import { useEffect, useState } from "react";
import '../styles/SearchBar.css'
export default function SearchBar({ placeholder, handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);
  
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
}
