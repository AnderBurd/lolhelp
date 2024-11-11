import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../styles/HomeScreen.css'

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
        <div class = "container">
            <h1 class = "title">LoLHelp</h1>
            <div class = "searchbar">
                <input 
                    class = "inputForm"
                    type="text" 
                    placeholder="Enter Champion Name" 
                    value={searchedChampion} 
                    onChange={handleInputChange} 
                />
                <button class = "searchButton" onClick={handleSearch}></button>
            </div>
        </div>
    );
}

export default HomeScreen;