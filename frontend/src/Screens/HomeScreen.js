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
        <div className = "container">
            <h1 className = "title">LoLHelp</h1>
            <div className = "searchbar">
                <input 
                    className = "inputForm"
                    type="text" 
                    placeholder="Enter Champion Name" 
                    value={searchedChampion} 
                    onChange={handleInputChange} 
                />
                <button className = "searchButton" onClick={handleSearch}></button>
            </div>
        </div>
    );
}

export default HomeScreen;