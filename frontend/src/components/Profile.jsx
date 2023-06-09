import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated &&
    !isLoading && (
      <section className="profile">
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div>
          <img src={user.picture} alt={user.name} />
        </div>
      </section>
    )
  );
};

export default Profile;
