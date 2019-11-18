import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import firebase from "../firebase";
import { useAuth } from "../context/auth";
import Button from "../components/GlobalComponents/Button";
import Input from "../components/GlobalComponents/Input";
import SEO from "../components/GlobalComponents/SEO";
import ErrorContainer from "../components/GlobalComponents/ErrorContainer";

const StyledLogIn = styled.div`
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 800px) {
    width: 60vw;
  }
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
  const [userError, setUserError] = useState("");
  const [redirect, setRedirect] = useState(false);
  // Do something while loading
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  // Get user if logged in
  const { authUser } = useAuth();

  // Reset form after submitting
  const resetForm = () => {
    setUserEmail("");
    setUserPassword("");
    setUserError("");
  };

  // Logout
  const logout = () => {
    firebase.auth().signOut();
    resetForm();
  };

  // Login, display error in swedish if firebase returns error
  const login = async e => {
    e.preventDefault();
    setLoading(true);
    setUserError(null);
    try {
      await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword);
      // redirect user
      setRedirect(true);
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setUserError("Ogiltig epostadress");
      }
      if (err.code === "auth/wrong-password") {
        setUserError("Felaktigt lösenord");
      }
    } finally {
      setLoading(false);
      if (userError !== "") {
        resetForm();
      }
    }
  };

  // Reset password, display error in swedish if firebase returns error
  const resetPassword = async e => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(userEmail)
      .then(function() {
        console.log("Success");
      })
      // eslint-disable-next-line no-unused-vars
      .catch(function(err) {
        if (err.code === "auth/invalid-email") {
          setUserError("Ogiltig epostadress");
        }
      });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <StyledLogIn>
      <SEO
        title="Vintage Sverige: Logga in"
        description="Logga in hos Vintage Sverige för att tipsa om event m.m."
        url="http://vintagesverige.se/logga-in"
      />
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
            {userError !== "" && (
              <ErrorContainer>
                <p>{userError}</p>
              </ErrorContainer>
            )}
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
            <Button type="submit" onClick={login}>
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
          <Button type="submit" onClick={resetPassword}>
            Återställ lösenord
          </Button>
        </>
      )}
    </StyledLogIn>
  );
};

export default LogIn;
