import React from 'react'
import { crossButton,Signin,h1,p,input,para,a,googlecss } from "./login.css";
import { useNavigate } from "react-router-dom";
import loginImage from "./login.png";
import google from "./google.png";
import firebaseAuth from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
function Front({setView}) {
  const navigate = useNavigate();
  const signInWithFirebase = () => {
    var googleProvider = new GoogleAuthProvider()
    signInWithPopup(firebaseAuth, googleProvider)
      .then((response) => {
        console.log(response._tokenResponse.email);
        localStorage.setItem(
          "oAuth",
          JSON.stringify(response._tokenResponse.oauthAccessToken)
        );
        const user = {
          Email: response._tokenResponse.email,
          Photo: response._tokenResponse.photoUrl,
          Name: response._tokenResponse.displayName,
          Password:"12345"
        };
        axios
          .post("http://localhost:8080/auth/register", user)
          .then((response) => {
            alert("Login Successful");
            navigate("/")
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
        style={crossButton}
      >
        X
      </button>
      <br />
      <div style={Signin}>
        <h1 style={h1}>Sign in</h1>
        <p style={p}>
          To quickly find your favourites items, saved addresses and payments.
        </p>
        <div
          style={{
            width: "100%",
            height: "0px",
            border: "0.1px solid #c9c9c9",
          }}
        ></div>
        <p style={p}>Register and earn 2000 reward points</p>
      </div>
      <img src={loginImage} alt="gift Image" />
      <div style={para}>
        <button onClick={() => setView("register")} style={input}>
          Enter Phone Number
        </button>
        <br /><br />
        <button onClick={() => navigate("/register")} style={input}>
          register
        </button>
        <br />
        <img
          onClick={signInWithFirebase}
          style={googlecss}
          src={google}
          alt="google Login"
        />
      </div>
      <div style={para}>
        <p>
          By continuing, you agree that you have read and accept our{" "}
          <a
            style={a}
            href="https://www.nykaa.com/terms-conditions"
            target="blank"
          >
            T&Cs
          </a>{" "}
          and{" "}
          <a
            style={a}
            href="https://www.nykaa.com/privacy-policy"
            target="blank"
          >
            Privacy Policy.
          </a>
        </p>
      </div>
    </div>
  );
}

export default Front