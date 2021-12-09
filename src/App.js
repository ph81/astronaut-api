import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [astronauts, setAstronauts] = useState([]);
  const api_url = 'http://api.open-notify.org/astros.json';

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

  return (
    <div className='App'>
      <main className="App-header">
        <h2>Astronauts</h2>
        <ul>
          {astronautList}
        </ul>
      </main>
     
   
    </div>
  )
}

export default App;
