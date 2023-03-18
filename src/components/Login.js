import { useNavigate, useLocation, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import { useEffect, useState } from "react";

const Login = () => {
  const app = initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname === "/login" ? true : false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [emailUsed, setEmailUsed] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const auth = getAuth();

  const validation = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        return value.match(/^([\w.%+-])+@([\w-]+\.)+([\w]{2,})$/i);
      case "password":
        return value.length >= 6;
      default:
        break;
    }
  };

  const clickHandler = (e) => {
    e.preventDefault();

    if(!validation('email', email) || !validation('password', password)) {
      setEmailValid(validation('email', email));
      setPasswordValid(validation('password', password));
      return;
    }

    if (page) {
      signInWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch((error) => setUserExist(true));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch((error) => setEmailUsed(true));
    }
  };

  useEffect(() => {
    setEmailUsed(false);
    setUserExist(false);
  }, [location]);

  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{page ? "Sign In" : "Sign Up"}</h1>
        <br />
        <form>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          {!emailValid && <p className="text-danger">Invalid Email</p>}
          <input
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          {!passwordValid && (
            <p className="text-danger">Invalid Password</p>
          )}
          <button className="btn btn-danger btn-block" onClick={clickHandler}>
            {page ? "Sign In" : "Sign Up"}
          </button>
          <br />
          {page && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label text-white"
                htmlFor="flexCheckDefault"
              >
                Remember Me
              </label>
            </div>
          )}
        </form>
        <br />
        <br />
        {userExist && (
          <p className="text-danger">
            User does not exist. Please Signup to cotinue.
          </p>
        )}
        {emailUsed && (
          <p className="text-danger">
            Email already in use. Try another email or Sign in
          </p>
        )}
        <div className="login-form-other">
          <div className="login-signup-now">
            {page ? "New to Netflix" : "Existing User"} &nbsp;
            <Link className=" " to={page ? "/signup" : "/login"}>
              {page ? "Sign Up Now" : "Sign In"}
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
        alt=""
      ></img>
    </div>
  );
};

export default Login;
