import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './Main.scss';

import logo from '../../pictures/logo-RickAndMorty.svg';
import icon from '../../pictures/icon-RickAndMorty-NoSearchResults.svg';
import RenderedCards from '../../components/RenderedCards/RenderedCards';

const Main = () => {
  const [results, setResults] = useState(null);
  const [noData, setNoData] = useState(null);
  const [sentQuery, setSentQuery] = useState(false);
  const [stringQuery, setStringQuery] = useState('');
  const { register, handleSubmit, reset } = useForm();

  const api = 'https://rickandmortyapi.com/api/character/';

  const getCharacters = endpoint => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error:', data.error);
          setNoData(true);
          setResults('');
        } else {
          console.log('Success:', data);
          setNoData(false);
          setResults(data);
          console.log(noData);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setNoData(true);
      });
  };

  useEffect(() => {
    setResults(getCharacters(api));
    // eslint-disable-next-line
  }, []);

  const onSubmit = data => {
    if (!data.characterName && !data.status && !data.gender) {
      setSentQuery(false);
    } else {
      setSentQuery(true);
    }
    const query = `${api}?name=${data.characterName}&status=${data.status}&gender=${data.gender}`;
    setResults(getCharacters(query));
    const templateQuery = `${data.characterName} ${data.status} ${data.gender}`;
    setStringQuery(templateQuery);
    reset();
  };

  return (
    <section>
      <section className='home-header'>
        <div className='logos'>
          <img
            className='home-header--logo'
            src={logo}
            alt='rick and morty logo'
          />
        </div>
        <div className='search-form'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='form-label'>Name</label>
            <input
                className='form-field'
                type='search'
                placeholder='Search for a character'
                name='characterName'
                ref={register}>
              </input>
            <label className='form-label'>Status</label>
            <select
                className='form-field'
                type='dropdown'
                name='status'
                ref={register}
              >
              <option value=''>None</option>
              <option value='alive'>Alive</option>
              <option value='dead'>Dead</option>
              <option value='unknown'>Unknown</option>
            </select>
            <label className='form-label'>Gender</label>
            <select
                className='form-field'
                type='dropdown'
                name='gender'
                ref={register}
              >
              <option value=''>None</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='unknown'>Unknown</option>
              <option value='genderless'>Genderless</option>
            </select>    
            <input
              className='submit-button'
              type='submit'
              value='Submit'></input>
          </form>
        </div>
      </section>
      {sentQuery ? (
        <div className='search-status'>
          <h3 className='search-status--query'>Searched for: {stringQuery}</h3>
        </div>
      ) : (
        ''
      )}
      {noData ? (
        <div className='search-status'>
          <h3 className='search-status--message'>No search results. Try again!</h3>
          <img className='search-status--icon' src={icon} alt='rick and morty no search results' />
        </div>
      ) : (
        ''
      )}
      {results ? <RenderedCards results={results} /> : ''}
    </section>
  );
};

export default Main;
