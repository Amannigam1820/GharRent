import React, { useEffect, useState } from "react";
import "./ListPage.scss";
import { listData } from "../../lib/dummydata";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useSearchPropertyQuery } from "../../redux/api/api";
import { useLocation } from "react-router-dom";

const ListPage = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {
      city: searchParams.get("city") || "",
      type: searchParams.get("type") || "",
      property: searchParams.get("property") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      bedroom: searchParams.get("bedroom") || "",
    };
    setQueryParams(params);
  }, [location.search]);

  // console.log(queryParams);

  const { data, isLoading, error } = useSearchPropertyQuery({
    city: queryParams.city,
    type: queryParams.type,
    minPrice: queryParams.minPrice,
    maxPrice: queryParams.maxPrice,
    property: queryParams.property,
    bedroom: queryParams.bedroom,
  });

  //console.log(data.posts);

  //console.log(data.posts)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // console.log(data.posts);

  const objects = data.posts;

  const updatedObjects = objects.map((obj) => {
    if (obj.images && obj.images.length > 0) {
      const firstImage = obj.images[0].toString();
      return {
        ...obj,
        images: firstImage,
      };
    } else {
      const emptyImage = obj.images.toString();
      return {
        ...obj,
        images: emptyImage,
      };
    }
  });

  //console.log(updatedObjects);

  return isLoading ? (
    <div>loading.....</div>
  ) : (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {updatedObjects.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data.posts} />
      </div>
    </div>
  );
};

export default ListPage;
