import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";

function Articles() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log(token);
        const response = await axios.get("http://localhost:4000/articles", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [getAccessTokenSilently]);

  return (
    isAuthenticated &&
    !isLoading &&
    articles && (
      <div>
        {console.log(articles)}
        {articles.map((article) => {
          return (
            <section>
              <h2>{article.title}</h2>
              <p>{article.body}</p>
            </section>
          );
        })}
      </div>
    )
  );
}

export default Articles;