import React from "react";
import { useNavigate } from "react-router";
import { FacebookLoginButton } from "react-social-login-buttons";
import { auth, facebookAuthProvider } from "../../../client/firebase";

export const SignInFacebook = () => {
  const navigate = useNavigate();

  const handleSignIn = () =>
    auth.signInWithPopup(facebookAuthProvider).then(() => {
      navigate("/channels/");
    });

  return <FacebookLoginButton onClick={handleSignIn} />;
};
