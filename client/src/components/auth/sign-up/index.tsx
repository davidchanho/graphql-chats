import React, { useState } from "react";
import { auth } from "../../../config/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => auth.createUserWithEmailAndPassword(email, password);

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signup}>Register</button>
    </div>
  );
};

export default SignUp;
