import { useNavigate } from "react-router";
import { auth } from "../../../client/firebase";

export const SignOut = () => {
  const navigate = useNavigate();

  const signout = () => 
    auth.signOut().then(() => {
      navigate("/");
    });

  return <button onClick={signout}>Sign out</button>;
};
