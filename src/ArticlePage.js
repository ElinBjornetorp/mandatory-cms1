import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {COCKPIT_ROOT} from './MainPage.js';

function ArticlePage(props) {
  let [article, updateArticle] = useState({});

  useEffect(function(){
    let articleId = props.match.params.id;

    axios.post(`${COCKPIT_ROOT}/api/collections/get/articles`, {
      filter: {_id: articleId},
    })
    .then(function (response) {
      console.log(response.data.entries[0]);
      updateArticle(response.data.entries[0]);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  //Svaret från API:t hinner inte tillbaka tills html:en renderas.
  // Bättre sätt att lösa detta?...I nuläget kollar jag om author finns.
  return (
    <div>
      <h2>{article.title}</h2>
      { article.author ? <p>{article.author[0].display}</p> : null}
      <p>{article.published_on}</p>
      <p>{article.body}</p>
    </div>
  );

  // return(
  //   <div>
  //     <h2>{article.title}</h2>
  //     <p>{article.author[0].display}</p>
  //     <p>{article.date}</p>
  //     <p></p>
  //   </div>
  // );
}

export { ArticlePage };
