import { useNavigate } from "react-router";
import { auth } from "../../../config/firebase";

export const SignOut = () => {
  const navigate = useNavigate();
  const signout = () =>
    auth.signOut().then(() => {
      navigate("/");
    });

  return <button onClick={signout}>Sign out</button>;
};
