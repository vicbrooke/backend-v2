import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const [endpoints, setEndpoints] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api");
        const endpointsData = response.data.endpoints;
        setEndpoints(Object.entries(endpointsData));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    endpoints && (
      <div>
        {console.log(endpoints)}
        <h2>Home</h2>
        {endpoints.map((route) => {
          return (
            <div>
              <h3>{route[0]}</h3>
              <h3>{route[1].description}</h3>
            </div>
          );
        })}
      </div>
    )
  );
}

export default Home;
