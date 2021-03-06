import React, { useState } from 'react';
// Internal Stylesheets
import './RenderedCards.scss';
// Assets
import icon from '../../pictures/icon-RickAndMorty-folks.svg';
import Card from '../Card/Card';

const RenderedCards = ({ results }) => {
  const count = results.info.count;
  const [next, setNext] = useState(results.info.next);
  const [items, setItems] = useState(results.results);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (next != null) {
        getNextCharacters(next);
      } else {
        setNoData(true);
      }
    }
  };

  const getNextCharacters = endpoint => {
    setLoading(true);
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        const newItems = items.concat(data.results);
        setItems(newItems);
        setNext(data.info.next);
        if (data.length === 0) setNoData(true);
        if (data.results.length < 20) setNoData(true);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className='rendered-cards'>
      <div className='rendered-cards--header'>
        <h3>Number of Results: {count}</h3>
      </div>
      <div className='rendered-cards--results'>
        {items.map((character, index) => {
          return (
            <Card
              key={index.toString()}
              id={index + 1}
              imgSrc={character.image}
              imgAlt={character.name}
              name={character.name}
              status={character.status}
              species={character.species}
              gender={character.gender}
              location={character.location.name}
              episodeFirst={character.episode[0]}
            />
          );
        })}
      </div>
      <div className='search-status'>
        {loading ? <h3 className='search-status--message'>loading data ...</h3> : ''}
        {noData | items.length < 20 
        ? <img
            className='search-status--icon'
            src={icon}
            alt='rick and morty no more results'
          /> : ''}
      </div>
    </section>
  );
};

export default RenderedCards;
