import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

export default function App() {
  return (
    <div className="App">
      <Authenticator socialProviders={["google"]}>
        {({ signOut, user }) => (
          <BrowserRouter>
            <Routes>
              <Route
                path="/profile"
                element={<Profile signOutFunction={signOut} userInfo={user} />}
              />
              <Route
                path="/"
                element={<Chat signOutFunction={signOut} userInfo={user} />}
              />
            </Routes>
          </BrowserRouter>
        )}
      </Authenticator>
    </div>
  );
}
