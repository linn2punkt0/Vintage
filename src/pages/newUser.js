import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { useAuth } from "../context/auth";
import Button from "../components/Button";
import Input from "../components/Input";

const StyledNewUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const NewUser = () => {
  // These are good for now
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPassword2, setUserPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [userError, setUserError] = useState("");

  // Do something while loading
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  // Get user if logged in
  const { authUser } = useAuth();

  // If any fields are empty or if passwords do not match, disable submit-button
  const isInvalid =
    userPassword !== userPassword2 ||
    userPassword === "" ||
    userEmail === "" ||
    username === "";

  const resetInput = () => {
    setUserEmail("");
    setUserPassword("");
    setUserPassword2("");
    setUsername("");
    setUserError("");
  };

  const submitForm = async e => {
    e.preventDefault();
    setLoading(true);
    setUserError(null);
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, userPassword);
      // redirect user?
    } catch (err) {
      setUserError(err);
    } finally {
      setLoading(false);
      resetInput();
    }
  };

  return (
    <StyledNewUser>
      <h2>Registrera ditt konto här:</h2>
      {authUser ? (
        <h2>Du är redan inloggad</h2>
      ) : (
        <>
          <h3>Varför ska jag registrera mig?</h3>
          <p>
            För att minska risken för spam och botar så får endast inloggade
            användare bidra med innehåll till Vintage Sverige. Du behöver bara
            fylla i din email och ett lösenord.
          </p>
          <form>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
            <Input
              // Change type to password when finished with login-system
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={userPassword}
              onChange={e => setUserPassword(e.target.value)}
            />
            <Input
              // Change type to password when finished with login-system
              type="password"
              name="password2"
              id="password2"
              placeholder="confirm password"
              value={userPassword2}
              onChange={e => setUserPassword2(e.target.value)}
            />
            <Button
              type="submit"
              onClick={submitForm}
              disabled={isInvalid}
              margin="0 0 1em 0"
              bgColor="var(--secondary-button-color)"
            >
              Registrera ny användare
            </Button>
            <Link to="/logga-in">
              <Button type="button">Har du redan ett konto?</Button>
            </Link>
          </form>
        </>
      )}

      {userError && <p>{userError.message}</p>}
    </StyledNewUser>
  );
};

export default NewUser;
