import React, { useEffect, useState } from "react";
import "./Filter.scss";
import { useLocation } from "react-router-dom";


const Filter = () => {

  const location = useLocation();
  const [queryParams, setQueryParams] = useState({});

  
  const [formData, setFormData] = useState({
    city: "",
    type: "",
    property: "",
    minPrice: "",
    maxPrice: "",
    bedroom: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(formData).toString();
    const searchUrl = `/list?${queryParams}`;
    window.location.href = searchUrl;

  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {
      city: searchParams.get("city") || "",
      
    };
    setQueryParams(params);
  }, [location.search]);

  //console.log(queryParams.city);

  

  return (
    <div className="filter">
      <h1>
        Search results for <b>{queryParams.city}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="Type">Type</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="Property">Property</label>
          <select
            name="Property"
            id="Property"
            value={formData.Property}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            value={formData.minPrice}
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            value={formData.maxPrice}
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            value={formData.bedroom}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSearch}>
          <img src="search.png" alt="search" />
        </button>
      </div>
    </div>
  );
};

export default Filter;
