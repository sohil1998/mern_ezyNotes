import React, { useState } from "react";
import { useNavigate } from "react-router";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const creatAccountOrSignIN = () => {
    signUp ? setSignUp(false) : setSignUp(true);
  };

  const signUpFunc = () => {
    navigate("/home");
  };

  return (
    <div className="fullWidth">
      <div className="signinRoot">
        <div className="Col">
          {signUp && (
            <div>
              <input
                type="text"
                className="FormInput"
                placeholder="Enter Name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                className="FormInput"
                placeholder="Enter mobile"
                required
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
            </div>
          )}
          <input
            type="text"
            className="FormInput"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="FormInput"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="button"
            onClick={() => {
              signUpFunc();
            }}
          >
            <h3 className="textStyle1">{signUp ? "Sign up" : "Sign in"}</h3>
          </button>
          <div className="Row-Spacebtn">
            <button className="noStyle">
              <h4 className="textStyle2">Forgot password ?</h4>
            </button>
            <button
              className="noStyle"
              onClick={() => {
                creatAccountOrSignIN();
              }}
            >
              <h4 className="textStyle2">
                {signUp ? "Sign in ?" : "Create account ?"}
              </h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
