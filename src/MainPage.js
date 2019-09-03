import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const COCKPIT_ROOT = "http://192.168.99.100:8080";

function MainPage() {
  let [articles, updateArticles] = useState([]);

  //useEffect kommer bara köras första gången
  useEffect(function() {
    axios.post(`${COCKPIT_ROOT}/api/collections/get/articles`, {
      fields: {title: 1, author: 1, published_on: 1},
    })
    .then(function (response) {
      let articles = response.data.entries; //Ändra!! Är samma namn som state.
      console.log(articles);
      updateArticles(articles);
    })
    .catch(function (error) {
      console.log(error);
    });
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
    <table>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
}

export { MainPage, COCKPIT_ROOT };
