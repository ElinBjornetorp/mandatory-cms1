import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './MainPage.css';

const COCKPIT_ROOT = "http://192.168.99.100:8080";

function MainPage() {
  let [articles, updateArticles] = useState([]);
  let [pageNr, updatePageNr] = useState(1);
  let articlesPerPage = 5;

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

  //Varje gång pageNr uppdateras görs ett nytt anrop
  useEffect(function() {
    getArticles(articlesPerPage, pageNr);
  }, [pageNr]);

  function onClickGoForward(event) {
    updatePageNr(pageNr+1);
  }

  function onClickGoBack(event) {
    if(pageNr < 2) return;
    updatePageNr(pageNr-1);
  }

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
        { pageNr === 1 ? <button disabled>Tillbaka</button> : <button onClick={onClickGoBack}>Tillbaka</button> }
        <button onClick={onClickGoForward}>Nästa</button>
      </div>
      <Link className="authorsLink" to="/authors">Om våra bloggare</Link>
    </>
  );
}

export { MainPage, COCKPIT_ROOT };
