import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './MainPage.css';

const COCKPIT_ROOT = "http://192.168.99.100:8080";

function MainPage() {
  let [articles, updateArticles] = useState([]);
  let [pageNr, updatePageNr] = useState(1);
  let articlesPerPage = 5;
  let limit = 0;

  //Funktion som hämtar ett urval av artiklar
  function getArticles(articlesPerPage, pageNr) {
    axios.post(`${COCKPIT_ROOT}/api/collections/get/articles?sort[published_on]=-1`, {
      fields: {title: 1, author: 1, published_on: 1},
      skip: articlesPerPage * (pageNr-1),
      limit: articlesPerPage,
    })
    .then(function (response) {
      let articleData = response.data.entries;
      updateArticles(articleData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function onClickGoToNextPage(event) {
    updatePageNr(pageNr+1);
    getArticles(articlesPerPage, 2); //Fixa att pageNr uppdateras!

  }

  //useEffect kommer bara köras första gången
  useEffect(function() {
    getArticles(5, 1);
  }, []);

  let tableRows = articles.map(article => {
    return(
      <tr key={article._id}>
        <td>
          <Link to={`/articles/${article._id}`}>{article.title}</Link>
        </td>
        <td>{article.author[0].display}</td>
        <td>{article.published_on}</td>
      </tr>
    );
  });

  return(
    <>
      <table>
        <tbody>
          {tableRows}
        </tbody>
      </table>
      <div className="pagination">
        <button>Tillbaka</button>
        <button onClick={onClickGoToNextPage}>Nästa</button>
      </div>
      <Link className="authorsLink" to="/authors">Om våra bloggare</Link>
    </>
  );
}

export { MainPage, COCKPIT_ROOT };
