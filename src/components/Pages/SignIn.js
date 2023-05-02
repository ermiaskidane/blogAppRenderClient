import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Link } from "react-router-dom";
import { login } from "../../store/actions/userActions";
import Loader from "../Loader/Loader"
import "./SignUp.scss";
import "../../App.scss";

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);



  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
 
  return (
    <div className="sign-in">
      <h1 className="signIn--title">Sing In</h1>
      {error && (
        <div
          style={{
            fontSize: "13px",
            background: "#ff0055",
            padding: "4px 2px",
          }}
        >
          {error}
        </div>
      )}
      {loading && <Loader/>}
      <form onSubmit={submitHandler}>
        <div className="form--email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form--password">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>

      <div className="signIn--row">
        <p>
          {" "}
          New Customer?
          <Link to="/sign-up">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn
