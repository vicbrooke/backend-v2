import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import Unauthorised from "../components/Unauthorised";
import NewArticle from "../components/NewArticle";
// import Pagination from "../components/Pagination";

function Articles() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [articles, setArticles] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const [articlesPerPage, setArticlesPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const token = await getAccessTokenSilently();
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

  return isAuthenticated && !isLoading && articles ? (
    <section>
      <NewArticle />
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
        {console.log(currentPage)}
        {/* {currentPage && ( */}
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
            handleClick();
          }}
        >
          Next
        </button>
        {/* )} */}
      </div>
      <div className="articles">
        {articles.map((article) => {
          return (
            <article key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.body}</p>
              <div className="article-info">
                <p>Author: {article.user?.name}</p>
                <p>Comments: {article.comments?.length}</p>
              </div>
            </article>
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
        {currentPage && (
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
              handleClick();
            }}
          >
            Next
          </button>
        )}
      </div>
    </section>
  ) : (
    <Unauthorised />
  );
}

export default Articles;
