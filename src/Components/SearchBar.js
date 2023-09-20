import { useEffect, useState } from "react";
import "../styles/SearchBar.css";
import InputText from "./InputText";
export default function SearchBar({ placeholder, handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="search-bar">
      <InputText
        value={searchTerm}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
}
