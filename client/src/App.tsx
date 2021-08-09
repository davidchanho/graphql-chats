import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import useClient from "./client";
import { AuthProvider } from "./client/firebase";
import SidebarLayout from "./layouts/sidebar-layout";
import Chatroom from "./pages/chatroom";
import Register from "./pages/register";

function App() {
  const { client } = useClient();

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/channels" element={<SidebarLayout />}>
              <Route path="/:_id" element={<Chatroom />} />
            </Route>
            <Route path="/" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
