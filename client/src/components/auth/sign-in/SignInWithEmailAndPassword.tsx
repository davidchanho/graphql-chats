import { useNavigate } from "react-router-dom";
import { auth } from "../../../client/firebase";
import { Props } from "./SignInWithEmailAndPassword.types";

export const SignInEmailAndPassword = ({ email, password }: Props) => {
  const navigate = useNavigate();

  const handleSignIn = () =>
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      navigate("/channels/");
    });

  return <button onClick={handleSignIn}>Sign In</button>;
};
