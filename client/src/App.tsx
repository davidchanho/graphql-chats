import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import useClient from "./client";
import Chatroom from "./pages/chatroom";
import Register from "./pages/register";

function App() {
  const { client } = useClient();

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chatroom />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
