import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import Unauthorised from "../components/Unauthorised";
// import Pagination from "../components/Pagination";

function Articles() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [articles, setArticles] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const [articlesPerPage, setArticlesPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
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
  }, [articlesPerPage]);

  const handleClick = async () => {
    fetchData();
  };

  return isAuthenticated && !isLoading && articles ? (
    <section>
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
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            handleClick();
          }}
        >
          Previous
        </button>

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
      </div>
      <div className="pagination">
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            handleClick();
          }}
        >
          Previous
        </button>

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
