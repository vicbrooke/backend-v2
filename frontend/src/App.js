import "./App.css";
import Navbar from "./layout/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

import Home from "./pages/Home";

function App() {
  const { isLoading, error } = useAuth0();
  return (
    <div className="App">
      <Navbar />
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <Home />
        </>
      )}
    </div>
  );
}

export default App;
