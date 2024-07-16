import React, { useEffect } from "react";
import "./HomePage.scss";
import SearchBar from "../../components/searchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userExists, userNotExist } from "../../redux/reducer/auth";



const HomePage = () => {


  // const { user, loader } = useSelector((state) => state.auth);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   axios                             
  //     .get('http://localhost:8800/api/auth/me', {withCredentials:true})
  //     .then(({data}) => dispatch(userExists(data.user)))
  //     .catch((err) => dispatch(userNotExist()));
  // }, [dispatch]);


  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h2 className="title">
          Unlock the door to your next home.
          </h2>
          <p className="desc">
            We envision a world where renting a home is a joyous, stress-free
            experience. At <strong>GharRent</strong>, we strive to create spaces
            that are not just functional, but also inspiring and comfortable. We
            are committed to enhancing your lifestyle with every stay.
          </p>
          <SearchBar/>
          <div className="boxes">
            <div className="box">
                <h2>10+</h2>
                <h5>Years of Experience</h5>
            </div>
            <div className="box">
                <h2>200</h2>
                <h5>Award Gained</h5>
            </div>
            <div className="box">
                <h2>1200+</h2>
                <h5>Property ready</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="bg.png" alt="background" />
      </div>
    </div>
  );
};

export default HomePage;
