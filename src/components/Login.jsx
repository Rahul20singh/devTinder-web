import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("rahul1@gmail.com");
  const [password, setPassword] = useState("rahul123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let handleLogin = async function () {
    try {
      console.log("kskakakakak");

      let res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password,
        },
        { withCredentials: true }
      );

      console.log("here::::::::::::::::::::::::::::::::", res);
      dispatch(addUser(res.data.data));
      return navigate("/");
      // console.log(res);
    } catch (error) {
      if (error.status === 500) {
        setError("Invalid credentials");
      }

      console.error("e:::::::::::::", error);
    }
  };

  return (
    <div className="card w-full max-w-sm shadow-lg bg-base-100">
      <div className="card-body items-center text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form
          className="flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault(); // ← Prevent page reload
            handleLogin();
          }}
        >
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
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
