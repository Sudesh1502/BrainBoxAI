import React, { useState } from "react";
import "./Authentication.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import logo from '../assets/brainBox AI.png';

const Authentication = () => {
  const [toggle, setToggle] = useState(true);
  const [regname, setRegname] = useState("");
  const [regemail, setRegemail] = useState("");
  const [regpass, setRegpass] = useState("");
  const [logemail, setLogemail] = useState("");
  const [logpass, setLogpass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  //function to register the new user
  const authReg = async () => {
    //for incomplete fields
    if (regemail == "" || regname == "" || regpass == "") {
      toast.error("All fields are required!");
      return;
    }
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: regname,
          email: regemail,
          password: regpass,
        }),
      };
      const response = await fetch(
        "http://localhost:8080/auth/signup",
        options
      );
      //conversting res into json
      const res = await response.json();

      if (!response.ok) {
        //if error occurs
        toast.error(res.error || "Something went wrong!");
        return;
      }
      console.log(res);
      toast.success(res.message);

      setLogemail(regemail);
      setRegemail("");
      setRegname("");
      setRegpass("");
      setToggle(!toggle);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error("something went wrong!");
      }
      console.log(err);
    }
  };

  //function to login user
  const authLog = async () => {
    if (logemail === "" || logpass === "") {
      toast.error("All fields are required!");
      return;
    }

    toast.dismiss(); // clear old toast alerts

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important
        body: JSON.stringify({ email: logemail, password: logpass }),
      };

      const response = await fetch(
        "http://localhost:8080/auth/signin",
        options
      );
      const res = await response.json(); // always parse JSON

      // if error occurs
      if (!response.ok) {
        toast.error(res.error || "Login failed!");
        return;
      }

      // Success
      toast.success("Login successful!");

      setLogemail("");
      setLogpass("");
      navigate("/");
    } catch (err) {
      toast.error("Network error! Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="auth">
      <p className="toggler" onClick={() => setToggle(!toggle)}>
        {toggle ? (
          <>
            Already have an account?{" "}
            <span className="click-here">Click here</span>
          </>
        ) : (
          <>
            Create a new account? <span className="click-here">Click here</span>
          </>
        )}
      </p>
      <form action="" method="post">
        {toggle ? (
          <div className="signup boxFormat">
            <div className="logo">
                <div className="img">
                <img src={logo} alt="logo" />
                </div>
                <p>BrainBox AI</p>
            </div>
            <input
              placeholder="Enter your name"
              type="text"
              label="name"
              value={regname}
              onChange={(e) => {
                e.preventDefault();
                setRegname(e.target.value);
              }}
            />
            <input
              placeholder="Enter your email"
              type="email"
              label="email"
              value={regemail}
              onChange={(e) => {
                e.preventDefault();
                setRegemail(e.target.value);
              }}
            />
            <div className="password-wrapper">
              <input
                className="passin"
                placeholder="Enter password"
                type={showPass ? "text" : "password"}
                value={regpass}
                onChange={(e) => setRegpass(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <i className="fa-solid fa-eye" style={{ color: "black" }}></i>
                ) : (
                  <i
                    className="fa-solid fa-eye-slash"
                    style={{ color: "black" }}
                  ></i>
                )}
              </span>
            </div>
            <button
              className="btn login"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                authReg();
              }}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="signin boxFormat">
            <div className="logo">
                <div className="img">
                <img src={logo}alt="logo" />
                </div>
                <p>BrainBox AI</p>
            </div>
            <input
              placeholder="Enter your email"
              type="email"
              label="email"
              value={logemail}
              onChange={(e) => {
                e.preventDefault();
                setLogemail(e.target.value);
              }}
            />
            <div className="password-wrapper">
              <input
                className="passin"
                placeholder="Enter password"
                type={showPass ? "text" : "password"}
                value={logpass}
                onChange={(e) => setLogpass(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <i className="fa-solid fa-eye" style={{ color: "black" }}></i>
                ) : (
                  <i
                    className="fa-solid fa-eye-slash"
                    style={{ color: "black" }}
                  ></i>
                )}
              </span>
            </div>
            <button
              className="btn login"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                authLog();
              }}
            >
              Login
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Authentication;
