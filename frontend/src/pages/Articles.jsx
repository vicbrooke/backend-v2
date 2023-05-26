import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import Unauthorised from "../components/Unauthorised";

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

  return isAuthenticated && !isLoading && articles ? (
    <section className="articles">
      {console.log(articles)}
      {articles.map((article) => {
        return (
          <article>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <div className="article-info">
              <p>Author: {article.user.name}</p>
              <p>Comments: {article.comments.length}</p>
            </div>
          </article>
        );
      })}
    </section>
  ) : (
    <Unauthorised />
  );
}

export default Articles;
