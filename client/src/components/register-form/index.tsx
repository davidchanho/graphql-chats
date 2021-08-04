import { useMutation } from "@apollo/client";
import { default as React, useState } from "react";
import { ADD_USER } from "../../queries";

const initialForm = {
  email: "",
  password: "",
  name: "",
};

function RegisterForm() {
  const [form, setForm] = useState(initialForm);

  const [addUser] = useMutation(ADD_USER, {
    variables: {
      item: form,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser();
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="name"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="password"
      />
      <button type="submit">register</button>
    </form>
  );
}

export default RegisterForm;
