import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useClient from "./client";
import { AuthProvider } from "./client/firebase";
import SidebarLayout from "./layouts/sidebar-layout";
import Channel from "./pages/channel";
import Register from "./pages/register";
import User from "./pages/users";

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
            <Route path="/users" element={<SidebarLayout />}>
              <Route path="/:_id" element={<User />} />
            </Route>
            <Route path="/channels" element={<SidebarLayout />}>
              <Route path="/:_id" element={<Channel />} />
            </Route>
            <Route path="/" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
