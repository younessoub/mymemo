import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth, db } from "../firebase-config";

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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //const uid = user.uid;
        navigate("/", { replace: true });
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [navigate]);

  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // ...

        const addData = async () => {
          await setDoc(doc(db, "memos", userCredential.user.uid), {
            text: "",
            userId: userCredential.user.uid
          });
        };
        addData();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.form} onSubmit={signup}>
        <h2>Sign Up</h2>
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
        <input style={styles.submit} type="submit" value="SignUp" />
        <p style={{ fontSize: "1.1rem", marginTop: "20px", color: "grey" }}>
          Already have an account{" "}
          <Link to="/login" style={{ color: "white" }}>
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
