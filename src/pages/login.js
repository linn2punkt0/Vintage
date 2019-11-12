import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { useAuth } from "../context/auth";
import Button from "../components/GlobalComponents/Button";
import Input from "../components/GlobalComponents/Input";

const StyledLogIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLoginForm = styled.div`
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2em;
  border: solid 1px black;
  border-radius: 5px;
`;

const LogIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userError, setUserError] = useState(null);
  // Do something while loading
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  // Get user if logged in
  const { authUser } = useAuth();

  const resetForm = () => {
    setUserEmail("");
    setUserPassword("");
    setUserError("");
  };

  // If any fields are empty disable submit-button
  const isInvalid = userPassword === "" || userEmail === "";

  const logout = () => {
    firebase.auth().signOut();
  };

  const login = async e => {
    e.preventDefault();
    setLoading(true);
    setUserError(null);
    try {
      await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword);
      // redirect user?
    } catch (err) {
      setUserError(err);
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  const resetPassword = async e => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(userEmail)
      .then(function() {
        console.log("Success");
      })
      // eslint-disable-next-line no-unused-vars
      .catch(function(error) {
        console.log("not working");
      });
  };

  return (
    <StyledLogIn>
      <Helmet>
        <title>Vintage Sverige: Logga in</title>
        <meta
          name="description"
          content="Logga in hos Vintage Sverige för att tipsa om event m.m."
          data-react-helmet="true"
        />
      </Helmet>
      {authUser ? (
        <>
          <h2>Du är inloggad</h2>
          <Button type="submit" onClick={logout}>
            Logga ut
          </Button>
        </>
      ) : (
        <>
          <h2>Logga in här:</h2>
          <StyledLoginForm>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={userPassword}
              onChange={e => setUserPassword(e.target.value)}
            />
            <Button type="submit" onClick={login} disabled={isInvalid}>
              Logga in
            </Button>
          </StyledLoginForm>
          <h3>Ny användare? Klicka på knappen nedan.</h3>
          <Link to="/registrera-dig">
            <Button type="button">Ny användare</Button>
          </Link>
          <h3>
            Glömt lösenord? Fyll i din E-mail och klicka på knappen nedan.
          </h3>
          <Button type="submit" onClick={resetPassword} disabled={isInvalid}>
            Återställ lösenord
          </Button>
        </>
      )}
      {userError && <p>{userError.message}</p>}
    </StyledLogIn>
  );
};

export default LogIn;
