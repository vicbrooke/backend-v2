import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function ApiEndpoints() {
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
      <div className="api-endpoints">
        <h2>These are the available endpoints for the api:</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((item, index) => (
                <tr key={index}>
                  <td>{item[0]}</td>
                  <td>{item[1].description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

export default ApiEndpoints;
