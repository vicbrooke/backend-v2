import "./App.css";
import Navbar from "./layout/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Articles from "./pages/Articles";

function App() {
  const { isLoading, error } = useAuth0();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/articles" element={<Articles />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
