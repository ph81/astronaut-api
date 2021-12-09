import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [astronauts, setAstronauts] = useState([]);
  const api_url = 'http://api.open-notify.org/astros.json';
  const [characters, setCharacters] = useState([]);
  const star_wars = 'https://swapi.dev/api/people';

  // setting the dependencies array in useEffect to an empty array
  // ensures this fetch request only runs once instead of infinitely
  useEffect(() => {
    fetch(api_url)
    .then(res => res.json())
    .then(data => setAstronauts(data.people))
    .catch(err => console.error(err))
  }, []);

  //list for the DOM
  const astronautList = astronauts.map((astronaut, index) => (
    astronaut.name.includes('Kayla') 
    ?
    <li key={index}>
      <p>{astronaut.name} 👩🏿‍🚀 is flying in the {astronaut.craft} 🚀 spacecraft</p>
    </li>
    :
    <li key={index}>
      <p>{astronaut.name} 👩‍🚀 is flying in the {astronaut.craft} 🚀 spacecraft</p>
    </li>
  ));
  
  // Star Wars
  useEffect(() => {
    const source = axios.CancelToken.source(); 
    axios.get(star_wars, { cancelToken: source.token})
    .then((response) => {
      setCharacters(response.data.results);
    })
    .catch((error) => {
      if (axios.isCancel(error)) return;
    });

    return () => source.cancel();
  }, []);

  const characterList = characters.map((char, index) => (
    <li key={index}>
      <p>{char.name} - Birth in {char.birth_year}</p>
    </li>
  ))

  return (
    <div className='App'>
      <main className="App-header">
        <h2>Astronauts</h2>
        <ul>
          {astronautList}
        </ul>
        <h3>Star Wars characters</h3>
        <ul>
          {characterList}
        </ul>
      </main>
     
   
    </div>
  )
}

export default App;
