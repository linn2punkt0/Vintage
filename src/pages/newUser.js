// import React, { useState, useEffect } from "react";
import React from "react";
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "isomorphic-unfetch";
import styled from "styled-components";

const StyledNewUser = styled.div`
  & > form {
    width: 300px;
    display: flex;
    flex-direction: column;
  }
`;

const NewUser = () => {
  //   const [user, setUser] = useState(null);
  //   const [userEmail, setUserEmail] = useState("");
  //   const [userPassword, setUserPassword] = useState("");
  //   const [username, setUsername] = useState("");

  //   const handleChange = event => {
  //     if (event.target.id === "email") {
  //       setUserEmail(event.target.value);
  //     }
  //     if (event.target.id === "password") {
  //       setUserPassword(event.target.value);
  //     }
  //     if (event.target.id === "username") {
  //       setUsername(event.target.value);
  //     }
  //   };

  //   const createNewUser = e => {
  //     e.preventDefault();
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(userEmail, userPassword)
  //       .then(cred => {
  //         const newUser = cred.user;
  //         // console.log(newUser);
  //         if (newUser) {
  //           newUser
  //             .updateProfile({
  //               displayName: username
  //               // photoURL: // some photo url
  //             })
  //             .then(s => console.log(s));
  //         }
  //       });
  //   };

  return (
    <StyledNewUser>
      <h2>Registrera ditt konto här:</h2>
      {/* {user ? (
        <h2>Du är redan inloggad</h2>
      ) : (
        <form>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={e => handleChange(e)}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={userEmail}
            onChange={e => handleChange(e)}
          />
          <input
            // Change type to password when finished with login-system
            type="text"
            name="password"
            id="password"
            placeholder="password"
            value={userPassword}
            onChange={e => handleChange(e)}
          />
          <button type="submit" onClick={createNewUser}>
            Registrera ny användare
          </button>
          <Link href="/login" as="/logga-in">
            <button type="button">Har du redan ett konto?</button>
          </Link>
        </form>
      )} */}
    </StyledNewUser>
  );
};

export default NewUser;
