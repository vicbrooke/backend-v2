import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Unauthorised from "../components/Unauthorised";
import NewArticle from "../components/NewArticle";
import Article from "../components/Article";

function Articles() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [articles, setArticles] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [scopes, setScopes] = useState([]);
  const [viewForm, setViewForm] = useState(false);

  const [articlesPerPage, setArticlesPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const tokenDecoded = JSON.parse(atob(token.split(".")[1]));

      const tokenScopes = tokenDecoded.scope.split(" ");
      setScopes(tokenScopes);

      const response = await axios.get(
        `http://localhost:4000/articles?limit=${articlesPerPage}&page=${currentPage}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [articlesPerPage, currentPage]);

  const handleClick = async () => {
    fetchData();
  };

  const handleArticleDelete = (articleId) => {
    setArticles(articles.filter((article) => article.id !== articleId));
  };

  const handleArticleUpdate = () => {
    fetchData();
  };

  return isAuthenticated && !isLoading && articles ? (
    <section className="articles-container">
      {!viewForm && (
        <button className="form-btn" onClick={() => setViewForm(true)}>
          Add new article
        </button>
      )}

      {viewForm && <NewArticle setViewForm={setViewForm} />}

      <div className="pagination">
        <label>
          Results per page:
          <select
            onChange={(event) => {
              setArticlesPerPage(Number(event.target.value));
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
        </label>
        {currentPage > 0 && (
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
              handleClick();
            }}
          >
            Previous
          </button>
        )}
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
            handleClick();
          }}
        >
          Next
        </button>
      </div>
      <div className="articles">
        {articles.map((article) => {
          return (
            <Article
              key={article.id}
              article={article}
              onDelete={handleArticleDelete}
              onUpdate={handleArticleUpdate}
              scopes={scopes}
            />
          );
        })}
      </div>
      <div className="pagination">
        {currentPage > 0 && (
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
              handleClick();
            }}
          >
            Previous
          </button>
        )}

        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
            handleClick();
          }}
        >
          Next
        </button>
      </div>
    </section>
  ) : (
    <Unauthorised />
  );
}

export default Articles;
