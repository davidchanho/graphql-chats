import { useNavigate } from "react-router";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import {
  auth,
  facebookAuthProvider,
  googleAuthProvider,
} from "../../../client/firebase";

export const SignInGoogle = () => {
  const navigate = useNavigate();

  const handleSignIn = () =>
    auth.signInWithPopup(googleAuthProvider).then(() => {
      navigate("/channels/");
    });

  return <GoogleLoginButton onClick={handleSignIn} />;
};

interface Props {
  email: string;
  password: string;
}

export const SignInEmailAndPassword = ({ email, password }: Props) => {
  const navigate = useNavigate();

  const handleSignIn = () =>
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      navigate("/channels/");
    });

  return <button onClick={handleSignIn}>Sign In</button>;
};

export const SignInFacebook = () => {
  const navigate = useNavigate();

  const handleSignIn = () =>
    auth.signInWithPopup(facebookAuthProvider).then(() => {
      navigate("/channels/");
    });

  return <FacebookLoginButton onClick={handleSignIn} />;
};
