import { useRef, useState } from "react";
import "./postproperty.scss";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { useAddPropertyMutation } from "../../redux/api/api";
import toast from "react-hot-toast";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function PostProperty() {
  const [value, setValue] = useState("");
  const [latitudes,setLatitudes] = useState("")
  const [longitudes,setLongitudes] = useState("")
  const [images, setImages] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const hiddenDescRef = useRef(null);
  const [addProperty] = useAddPropertyMutation();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  

  function showPosition(position) {

    setLatitudes(position.coords.latitude)
    setLongitudes(position.coords.longitude)
    

    // console.log(latitude,longitude);
  }

  const getLoc = getLocation();

  const submitHandler = async (e) => {
    e.preventDefault();

    const strippedValue = value.replace(/<\/?[^>]+(>|$)/g, "");
    if (hiddenDescRef.current) {
      hiddenDescRef.current.value = strippedValue;
    }

    const formData = new FormData(e.target);

    const title = formData.get("title");
    const price = parseInt(formData.get("price"), 10);
    const address = formData.get("address");
    const desc = strippedValue;
    const city = formData.get("city");
    const bedroom = parseInt(formData.get("bedroom"), 10);
    const bathroom = parseInt(formData.get("bathroom"), 10);
    const latitude = latitudes.toString();
    const longitude = longitudes.toString();
    const type = formData.get("type");
    const property = formData.get("property");
    const utilities = formData.get("utilities");
    const pet = formData.get("pet");
    const income = formData.get("income");
    const size = parseInt(formData.get("size"), 10);
    const school = parseInt(formData.get("school"), 10);
    const bus = parseInt(formData.get("bus"), 10);
    const restaurant = parseInt(formData.get("restaurant"), 10);

    const formdata1 = {
      postData: {
        title,
        price,
        address,
        city,
        bedroom,
        bathroom,
        latitude,
        longitude,
        type,
        property,
        images: images,
      },
      postDetail: {
        desc,
        utilities,
        pet,
        income,
        size,
        school,
        bus,
        restaurant,
      },
    };
    console.log(formdata1);
    try {
      const res = await addProperty({
        formData: formdata1,
      });

      console.log(res.data.post.id);

      toast.success(res.data.message);
      navigate(`/${res.data.post.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={submitHandler}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>

            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
              <input type="hidden" name="desc" ref={hiddenDescRef} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            {/* <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div> */}
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button type="submit" className="sendButton">
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} alt="images" key={index} />
        ))}
        <UploadWidget
          uwConfig={{
            cloudName: "yash-backend18",
            uploadPreset: "GharRent",
            multiple: true,
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default PostProperty;
