import React, { useState } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [signUp, setSignUp] = useState(false);

  return (
    <div className="fullWidth">
      <div className="signinRoot">
        <div className="Col">
          {signUp && (
            <>
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
            </>
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
          <div className="button">
            <h3 className="textStyle1">{signUp ? "Sign up" : "Sign in"}</h3>
          </div>
          <div className="Row-Spacebtn">
            <button className="noStyle">
              <h4 className="textStyle2">Forgot password ?</h4>
            </button>
            <button
              className="noStyle"
              onClick={() => {
                signUp ? setSignUp(false) : setSignUp(true);
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
