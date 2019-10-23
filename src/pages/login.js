// import React, { useState, useEffect } from "react";
import React from "react";
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "isomorphic-unfetch";
import styled from "styled-components";

const StyledLogIn = styled.div``;

// const LogIn = ({ user }) => {
const LogIn = () => {
  //   const [userEmail, setUserEmail] = useState("");
  //   const [userPassword, setUserPassword] = useState("");

  //   const handleChange = event => {
  //     if (event.target.id === "email") {
  //       setUserEmail(event.target.value);
  //     }
  //     if (event.target.id === "password") {
  //       setUserPassword(event.target.value);
  //     }
  //   };

  //   const handleLogout = () => {
  //     firebase.auth().signOut();
  //   };

  //   const loginWithEmail = e => {
  //     e.preventDefault();
  //     firebase.auth().signInWithEmailAndPassword(userEmail, userPassword);
  //   };

  return (
    <StyledLogIn>
      <h2>Logga in här:</h2>
      <div>
        {/* {user ? (
          <>
            <h2>Du är inloggad</h2>
            <button type="submit" onClick={handleLogout}>
              Logga ut
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={userEmail}
              onChange={e => handleChange(e)}
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
              value={userPassword}
              onChange={e => handleChange(e)}
            />
            <button type="submit" onClick={loginWithEmail}>
              Logga in
            </button>
            <Link href="/newUser" as="/registrera-dig">
              <button type="button">Ny användare</button>
            </Link>
          </>
        )} */}
      </div>
    </StyledLogIn>
  );
};

export default LogIn;
