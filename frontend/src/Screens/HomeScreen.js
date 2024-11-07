import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';

const HomeScreen = () =>{
    const [searchedChampion, setSearchedChampion] = useState(''); // New state to store searched champion
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchedChampion(event.target.value); // Update the input value
    };

    const handleSearch = () => {
        if(searchedChampion.trim() !== ''){
            navigate(`/ChampInfo/${searchedChampion}`)
        }
    };

    return (
        <div>
            <h1>League of Legends Champion Info</h1>
            <input 
                type="text" 
                placeholder="Enter Champion Name" 
                value={searchedChampion} 
                onChange={handleInputChange} 
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default HomeScreen;