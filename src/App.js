import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

function App() {

  const isLogged = false;

  return (
    <div className="App">
      <BrowserRouter>
        {!isLogged && <LoginScreen />}
        {isLogged && (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
