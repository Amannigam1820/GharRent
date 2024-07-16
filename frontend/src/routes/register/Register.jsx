import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {userExists} from "../../redux/reducer/auth"

const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const password = formData.get("password");


    console.log(formData);

    try {
      const response = await apiRequest.post("/auth/register", {
        username,
        email,
        contact,
        password,
      });
      //console.log(response.data.user);
     dispatch(userExists(response.data.user))
      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
   //   console.log(error);
      setError(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="contact" type="text" placeholder="Contact" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Register;
