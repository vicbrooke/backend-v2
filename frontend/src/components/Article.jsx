import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import EditArticleModal from "./EditArticleModal";

function Article({ article, onDelete, onUpdate, scopes }) {
  const { user, getAccessTokenSilently } = useAuth0();
  const [showModal, setShowModal] = useState(false);
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

  return (
    <>
      <article key={article.id}>
        <h2>{article.title}</h2>
        <p>{article.body}</p>
        <div className="article-info">
          <p>Author: {article.user?.name}</p>
          <p>Comments: {article.comments?.length}</p>
        </div>
        {article.user.username === user.nickname ||
        scopes.includes("write:all") ? (
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setShowModal(!showModal)}>Edit</button>
          </div>
        ) : null}
      </article>
      <div>
        {showModal && (
          <EditArticleModal
            article={article}
            showModal={showModal}
            setShowModal={setShowModal}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </>
  );
}

export default Article;
