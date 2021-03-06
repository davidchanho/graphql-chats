import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Input from "../../common/input";
import { SignInFacebook, SignInGoogle } from "../../components/auth/sign-in";
import { LOGIN_USER, REGISTER_USER } from "../../queries";

const initialForm = {
  email: "",
  password: "",
};

export function Register() {
  const [form, setForm] = useState(initialForm);
  const [isRegister, setRegister] = useState(true);

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: {
      item: form,
    },
  });

  const [registerUser] = useMutation(REGISTER_USER, {
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
    isRegister ? registerUser() : loginUser();
    setForm(initialForm);
  };

  const toggleForm = () => {
    setRegister(!isRegister);
  };

  const text = isRegister ? "Log in to your account" : "Sign up";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {text}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {text}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div>
                <SignInGoogle />
              </div>

              <div>
                <SignInFacebook />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={toggleForm}
            >
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
