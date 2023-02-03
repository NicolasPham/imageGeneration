import React from "react";

//pages
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";

import { logo } from "./assets";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center sm:px-8 px-4 py-4 bg-white border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img className="w-28 object-contain" src={logo} alt="logo" />
        </Link>

        <Link
          to="/create-post"
          className="font-inter font-medium text-white bg-[#6469ff] px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>

      <main className="w-full bg-[#f9fafe] sm:p-8 px-4 py-8 min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
