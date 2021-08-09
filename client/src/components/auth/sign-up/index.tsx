import React, { useState } from "react";
import Input from "../../../common/input";
import { auth } from "../../../client/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignupWithEmailAndPassword = () =>
    auth.createUserWithEmailAndPassword(email, password);

  return (
    <div>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={SignupWithEmailAndPassword}>Register</button>
    </div>
  );
};

export default SignUp;
