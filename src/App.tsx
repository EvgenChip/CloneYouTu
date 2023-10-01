import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

import { Login } from "./Pages/Login";
import { Registration } from "./Pages/Registration";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { authCheckAction } from "./store/auth/actions/authActions";
import { ErrorBoundary } from "./components/ErrorBoundary";

const Home = lazy(() => import("./Pages/Home"));
const SearchPage = lazy(() => import("./Pages/SearchPage"));
const WatchPage = lazy(() => import("./Pages/WatchPage"));
const Favorites = lazy(() => import("./Pages/Favorites"));
const History = lazy(() => import("./Pages/History"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authCheckAction());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <BrowserRouter basename="/cloneyoutu">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
