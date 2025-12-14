"use client";

import React, { useEffect, useState } from "react";
import Checkout from "../(protected)/(user)/checkout/page";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/lib/features/authSlice";
import { AppDispatch, RootState } from "@/lib/store";

const Login = () => {
  const loading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    dispatch(loginUser(credential));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((pre) => ({ ...pre, [name]: value }));
  };
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return (
    <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      <div className="card card0 border-0">
        <div className="row d-flex">
          <div className="col-lg-6">
            <div className="card1 pb-5">
              <div className="row">
                <img src="https://i.imgur.com/CXQmsmF.png" className="logo" />
              </div>
              <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                <img src="https://i.imgur.com/uNGdWHi.png" className="image" />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            {loading && <h2 className="text-sm">Loading...</h2>}
            <div className="card2 card border-0 px-4 py-5">
              <div className="row mb-4 px-3">
                <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                <div className="facebook text-center mr-3">
                  <div className="fa fa-facebook"></div>
                </div>
                <div className="twitter text-center mr-3">
                  <div className="fa fa-twitter"></div>
                </div>
                <div className="linkedin text-center mr-3">
                  <div className="fa fa-linkedin"></div>
                </div>
              </div>
              <div className="row px-3 mb-4">
                <div className="line"></div>
                <small className="or text-center">Or</small>
                <div className="line"></div>
              </div>
              <div className="row px-3">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm">Email Address</h6>
                </label>
                <input
                  className="mb-4"
                  type="text"
                  name="email"
                  value={credential.email}
                  onChange={handleChange}
                  placeholder="Enter a valid email address"
                />
              </div>
              <div className="row px-3">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm">Password</h6>
                </label>
                <input
                  type="password"
                  name="password"
                  value={credential.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>
              <div className="row px-3 mb-4">
                <div className="custom-control custom-checkbox custom-control-inline">
                  <input
                    id="chk1"
                    type="checkbox"
                    name="chk"
                    className="custom-control-input"
                  />
                  <label className="custom-control-label text-sm">
                    Remember me
                  </label>
                </div>
                <a href="#" className="ml-auto mb-0 text-sm">
                  Forgot Password?
                </a>
              </div>
              <div className="row mb-3 px-3">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-blue text-center"
                >
                  Login
                </button>
              </div>
              <div className="row mb-4 px-3">
                <small className="font-weight-bold">
                  Don't have an account?{" "}
                  <a className="text-danger ">Register</a>
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue py-4">
          <div className="row px-3">
            <small className="ml-4 ml-sm-5 mb-2">
              Copyright &copy; 2019. All rights reserved.
            </small>
            <div className="social-contact ml-4 ml-sm-auto">
              <span className="fa fa-facebook mr-4 text-sm"></span>
              <span className="fa fa-google-plus mr-4 text-sm"></span>
              <span className="fa fa-linkedin mr-4 text-sm"></span>
              <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
