import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleArticle() {
  const [article, setArticle] = useState(null);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [scopes, setScopes] = React.useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const tokenDecoded = JSON.parse(atob(token.split(".")[1]));

      const tokenScopes = tokenDecoded.scope.split(" ");
      setScopes(tokenScopes);

      const response = await axios.get(`http://localhost:4000/articles/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setArticle(response.data.article);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    article && (
      <section className="single-article">
        {console.log(article)}
        <h2>{article.title}</h2>
        <p>{article.body}</p>
        <div className="article-info">
          <p>👍 {article.votes}</p>
          <p>Author: {article.user.name}</p>
        </div>
        <hr />
        <h3>Comments:</h3>
        {article.comments.map((comment) => {
          return (
            <div className="comment">
              <p>{comment.body}</p>
              <div className="comment-info">
                <p>👍 {comment.votes}</p>
                <p>Author: {comment.user.name}</p>
              </div>
            </div>
          );
        })}
      </section>
    )
  );
}

export default SingleArticle;
