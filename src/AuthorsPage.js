import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {COCKPIT_ROOT} from './MainPage.js';
import './AuthorsPage.css';

function AuthorsPage() {
  let [authors, updateAuthors] = useState([]);

  //Hämtar författarna när sidan laddas
  useEffect(function(){
    axios.get(`${COCKPIT_ROOT}/api/collections/get/authors`)
    .then(function (response) {
      let authorData = response.data.entries;
      console.log(authorData);
      updateAuthors(authorData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  let authorDivs = authors.map(author => {
    return(
      <div>
          {author.avatar ? <img className="avatar" src={"http://192.168.99.100:8080/" + author.avatar.path} alt="Bild"/> : null}
        <h3>{author.name}</h3>
        <p>{author.description}</p>
      </div>
    );
  });

  return(
    <>
      <h2>Dessa är våra bloggare:</h2>
      {authorDivs}
    </>
  );
}

export { AuthorsPage };
