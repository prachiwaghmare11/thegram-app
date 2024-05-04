import "./App.css";
import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./components/CreatePost";
import { LoginContext } from "./context/LoginContext";
import Modal from "./components/Modal";
import UserProfile from "./components/UserProfile";

function App() {
  const [userLogin, setUserLogin] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route path="/createPost" element={<CreatePost />}></Route>
            <Route path="/profile/:userId" element={<UserProfile />}></Route>
          </Routes>
          <ToastContainer theme="dark" />
          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
