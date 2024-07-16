import React, { useEffect, useState } from "react";
import "./SinglePage.scss";
import Slider from "../../components/slider/Slider";

import Map from "../../components/map/Map";
import {
  useSavePlaceMutation,
  useSinglePropertyQuery,
} from "../../redux/api/api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { propertyExist } from "../../redux/reducer/singleProperty";

const SinglePage = () => {
  const { id } = useParams();
  //const {user} = useSelector((state)=>state.auth);
  const { property } = useSelector((state) => state.property);
  const [saved, setSaved] = useState(property?.isSaved);

  // console.log(saved);
  const dispatch = useDispatch();

  // const singleProperty  = useSinglePropertyQuery({propertyId:id});

  const {
    data: singleProperty,
    isLoading,
    error,
    refetch,
  } = useSinglePropertyQuery({ propertyId: id });

  const [savePlace] = useSavePlaceMutation();

  useEffect(() => {
    if (singleProperty) {
      dispatch(propertyExist(singleProperty));
      setSaved(singleProperty.isSaved); // Update local state based on the latest property data
    }
  }, [singleProperty, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!singleProperty) {
    return <div>No data available</div>;
  }

  



  // const loc = navigator.geolocation();
  // console.log(loc);

  //dispatch(propertyExist(singleProperty))

  const handleSave = async () => {
    const postId = singleProperty.id;

    const data = { postId: postId };

    try {
      const res = await savePlace({
        data: data,
      });
      // setSaved((prev)=>!prev);
      //console.log(saved);
      await refetch();
      setSaved((prev) => !prev);
      console.log(saved);

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save post");
    }
  };

  //console.log(singleProperty);

  return isLoading ? (
    <div>Loading....</div>
  ) : (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singleProperty.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singleProperty.title}</h1>
                <div className="address">
                  <img src="pin.png" />
                  <span>{singleProperty.address}</span>
                </div>
                <div className="price">${singleProperty.price}</div>
              </div>
              <div className="user">
                <img src={singleProperty.user.avatar} />
                <span>{singleProperty.user.username}</span>
              </div>
            </div>
            <div className="bottom">{singleProperty.postDetail.desc}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="utility.png" alt="" />
              <div className="featureText">
                <span>Utility</span>
                {singleProperty.postDetail.utilities === "owner" ? (
                  <p>Owner is Responsible</p>
                ) : (
                  <p>Tenant is Responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {singleProperty.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{singleProperty.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="size.png" alt="" />
              <span>{singleProperty.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="bed.png" alt="" />
              <span>{singleProperty.bedroom} Beds</span>
            </div>
            <div className="size">
              <img src="bath.png" alt="" />
              <span>{singleProperty.bathroom} Bathroom </span>
            </div>
          </div>
          <p className="title">Neaby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {singleProperty.postDetail.school > 999
                    ? (singleProperty.postDetail.school / 1000).toFixed(1) +
                      "km"
                    : singleProperty.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>
                  {singleProperty.postDetail.bus > 999
                    ? (singleProperty.postDetail.bus / 1000).toFixed(1) + "km"
                    : singleProperty.postDetail.bus + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>
                  {singleProperty.postDetail.restaurant > 999
                    ? (singleProperty.postDetail.restaurant / 1000).toFixed(1) +
                      "km"
                    : singleProperty.postDetail.restaurant + "m"}{" "}
                  away
                </p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singleProperty]} />
          </div>
          <div className="button">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
