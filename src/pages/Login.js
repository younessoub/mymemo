import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px"
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
    background: "rgba(0,0,0,0.3)",
    padding: "10px",
    borderRadius: "10px",
    width: "400px",
    fontSize: "1.5rem"
  },
  input: {
    width: "250px",
    marginBottom: "30px",
    height: "25px",
    fontSize: "1.3rem",
    borderRadius: "5px",
    padding: "5px",
    outline: "none"
  },
  submit: {
    height: "40px",
    width: "100px",
    fontSize: "inherit",
    background: "inherit",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/", { replace: true });

        // ...
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.form} onSubmit={login}>
        <h2>Log In</h2>
        <label>
          Email:
          <br />
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <br />
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <input style={styles.submit} type="submit" value="login" />
        <p style={{ fontSize: "1.1rem", marginTop: "20px", color: "grey" }}>
          Don't have an account{" "}
          <Link to="/signup" style={{ color: "white" }}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
