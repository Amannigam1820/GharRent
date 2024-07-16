import { useState } from "react";
import "./searchBar.scss";
import { useNavigate } from "react-router-dom";
import { useSearchPropertyQuery } from "../../redux/api/api";

const types = ["rent", "buy"];

const SearchBar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState({
    type: "Rent",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(query);
    navigate(`list?${searchParams.toString()}`);


  
  };

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="City Loaction"
          value={query.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={1000}
          max={1000000000}
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={1000}
          max={1000000000}
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleChange}
        />
        <button type="submit">
          <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
