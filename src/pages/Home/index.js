import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import "./Home.css";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase-config";

const Home = () => {
  const [text, setText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId && text) {
      const updateData = async () => {
        const memosRef = doc(db, "memos", userId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(memosRef, {
          text: text
        });
      };
      updateData();
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setUserEmail(user.email);
        setUserId(user.uid);
        const fetchData = async () => {
          const q = query(
            collection(db, "memos"),
            where("userId", "==", userId)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setText(doc.data().text);
          });
        };
        fetchData();
        // ...
      } else {
        // User is signed out
        // ...
        navigate("/login", { replace: true });
      }
    });
  }, [navigate, userId]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      {userEmail && (
        <div className="wrapper">
          <h2>Hello {userEmail}</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <textarea
                placeholder="Write something and click save"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </label>
            <input className="saveButton" type="submit" value="Save" />
          </form>
          <div
            style={{
              margin: "20px",

              textAlign: "center"
            }}
          >
            <button className="saveButton" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
