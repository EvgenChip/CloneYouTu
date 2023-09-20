import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import { Home } from "./Pages/Home";
import { SearchPage } from "./Pages/SearchPage";
import { WatchPage } from "./Pages/WatchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
      </Routes>
    </BrowserRouter>
    /* <Home /> */
  );
}

export default App;
