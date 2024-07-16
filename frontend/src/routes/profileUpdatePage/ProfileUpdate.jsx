import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./profileupdate.scss";
import { useSelector } from "react-redux";
import { useUpdateUserMutation, useUserInfoQuery } from "../../redux/api/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../../redux/reducer/auth";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

const ProfileUpdate = () => {
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState([]);

  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const password = formData.get("password");

    const formData1 = {
      username,
      email,
      contact,
      password,
      avatar: avatar[0],
    };

    //console.log(formData1);

    try {
      const res = await updateUser({
        userId: user.id,
        formData: formData1,
      });

      // console.log(res);

      //dispatch(userExists(res.updatedUser))

      // console.log(res.error.data);
      toast.success(res.data.message);
      navigate("/profile");
    } catch (error) {
      console.log("errorssss", error);
      //setError(error.response.data.message);
    }
  };

  // useEffect(()=>{
  //   const
  // })

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <h2>Update Profile</h2>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
            />
          </div>
          <div className="item">
            <label htmlFor="contact">Contact</label>
            <input
              id="contact"
              name="contact"
              type="contact"
              defaultValue={user.contact}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || user.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "yash-backend18",
            uploadPreset: "GharRent",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
