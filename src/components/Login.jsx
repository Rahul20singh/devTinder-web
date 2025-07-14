import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("rahul1@gmail.com");
  const [password, setPassword] = useState("rahul123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async function () {
    try {
      let res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (error) {
      if (error.status === 500) {
        setError("Invalid credentials");
      }

      console.error("e:::::::::::::", error);
    }
  };

  const handleSignup = async () => {
    try {
      console.log("before::::::::::::::::::;");
      let newUser = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email: emailId, password },
        { withCredentials: true }
      );
      console.log("new:::::::::::::", newUser);
      dispatch(addUser(newUser.data.data));
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card w-full max-w-sm shadow-lg bg-base-100">
      <div className="card-body items-center text-center">
        <h2 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form
          className="flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault(); // ← Prevent page reload
            if (isLogin) {
              handleLogin();
            } else {
              handleSignup();
            }
          }}
        >
          {!isLogin && (
            <>
              <input
                type="text"
                value={firstName}
                placeholder="firstName"
                className="input input-bordered w-48 mb-4"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                value={lastName}
                placeholder="lastName"
                className="input input-bordered w-48 mb-4"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <input
            type="email"
            value={emailId}
            placeholder="Email"
            className="input input-bordered w-48 mb-4"
            required
            onChange={(e) => setEmailId(e.target.value)}
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            className="input input-bordered w-48 mb-4"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500">{error ? error : ""}</p>
          <button type="submit" className="btn btn-primary">
            {isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          {!isLogin ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
            aria-label={
              isLogin ? "Log in to your account" : "Sign up for an account"
            }
          >
            {!isLogin ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
