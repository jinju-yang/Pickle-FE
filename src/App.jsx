import DetailPage from "./pages/detailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InitialPage } from "./pages/InitialPage";
import { LogInPage } from "./pages/LogInPage";
import SignUpPage from "./pages/SignInPage";
import GalleryPage from "./pages/GalleryPage";
import MainPage from "./pages/MainPage";
import PickPage from "./pages/PickPage";
import PickResultPage from "./pages/PickResultPage";
import { ResultProvider } from "./context/ResultContext";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  
  const [hello, setHello] = useState("");

  useEffect(() => {
    axios
      .get("/api/hello")
      .then((response) => setHello(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ResultProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/content" element={<DetailPage />} />
            <Route path="/" element={<InitialPage />} />
            <Route path="/log-in" element={<LogInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/pickle" element={<PickPage />} />
            <Route path="/result" element={<PickResultPage />} />
          </Routes>
        </BrowserRouter>
      </ResultProvider>
    </>
  );
}

export default App;
