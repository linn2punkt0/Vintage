import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { useAuth } from "../context/auth";
import Button from "../components/Button";

const StyledLogIn = styled.div``;

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

  return (
    <StyledLogIn>
      <h2>Logga in här:</h2>
      <div>
        {authUser ? (
          <>
            <h2>Du är inloggad</h2>
            <Button type="submit" onClick={logout}>
              Logga ut
            </Button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
              value={userPassword}
              onChange={e => setUserPassword(e.target.value)}
            />
            <Button type="submit" onClick={login} disabled={isInvalid}>
              Logga in
            </Button>
            <Link to="/registrera-dig">
              <Button type="button">Ny användare</Button>
            </Link>
          </>
        )}
      </div>
      {userError && <p>{userError.message}</p>}
    </StyledLogIn>
  );
};

export default LogIn;
