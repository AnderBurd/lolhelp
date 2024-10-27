import React, { useState } from 'react';
import Champion from './components/Champion';
import './styles/App.css'; // Optional: Create a CSS file for styles

const App = () => {
    const [championName, setChampionName] = useState('');
    const [searchedChampion, setSearchedChampion] = useState(''); // New state to store searched champion

    const handleInputChange = (event) => {
        setChampionName(event.target.value); // Update the input value
    };

    const handleSearch = () => {
        setSearchedChampion(championName); // Update the searched champion when the button is clicked
    };

    return (
        <div>
            <h1>League of Legends Champion Info</h1>
            <input 
                type="text" 
                placeholder="Enter Champion Name" 
                value={championName} 
                onChange={handleInputChange} 
            />
            <button onClick={handleSearch}>Search</button>

            {/* Conditionally render the Champion component when searchedChampion is set */}
            {searchedChampion && <Champion name={searchedChampion} />}
        </div>
    );
};

export default App;