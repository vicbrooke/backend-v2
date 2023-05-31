import React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Article({ article, onDelete }) {
  const { user, getAccessTokenSilently } = useAuth0();
  console.log(user);
  const articleId = article.id;

  const handleDelete = async () => {
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(
        `http://localhost:4000/articles/${articleId}/${user.nickname}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(articleId);
      alert("Your article has been deleted successfully!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = () => {};

  return (
    <article key={article.id}>
      {console.log(article.user.username, user.nickname)}
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <div className="article-info">
        <p>Author: {article.user?.name}</p>
        <p>Comments: {article.comments?.length}</p>
      </div>
      {article.user.username === user.nickname && (
        <div>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </article>
  );
}

export default Article;
