import { useNavigate } from "react-router";
import { GoogleLoginButton } from "react-social-login-buttons";
import { auth, googleAuthProvider } from "../../../client/firebase";

export const SignInGoogle = () => {
  const navigate = useNavigate();

  const handleSignIn = () =>
    auth.signInWithPopup(googleAuthProvider).then(() => {
      navigate("/channels/");
    });

  return <GoogleLoginButton onClick={handleSignIn} />;
};
