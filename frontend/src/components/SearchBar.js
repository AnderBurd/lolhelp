import '../styles/HomeScreen.css'
import championNames from './formattedChampionNames';
import React, { useState } from 'react';

const SearchBar = ({onSelectChampion}) =>{
    const [searchedChampion, setSearchedChampion] = useState(''); // New state to store searched champion
    const [suggestions,setSuggestions] = useState([])

    const handleInputChange = (e) => {
        const input = e.target.value;
        setSearchedChampion(input);

        //Check if input is empty so we can clear suggestions
        if(input === ''){
            setSuggestions([]);
        }
        else{
            // Filter champions based on the input text
            const filteredChampions = championNames.filter((champion) =>
                champion.name.toLowerCase().includes(input.toLowerCase())
            );
            // Show up to 5 suggestions
            setSuggestions(filteredChampions.slice(0, 5));
        }
    };

    const handleSuggestionClick = (champion) => {
        setSearchedChampion(champion.name);
        setSuggestions([]);
        onSelectChampion(champion.name);
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
                
                <button className = "searchButton" onClick={()=>onSelectChampion(searchedChampion)}></button>
            </div>
            <div className = "suggestion-container">
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((champion) => (
                            <li 
                                key={champion.id} 
                                onClick={() => handleSuggestionClick(champion)}
                                className="suggestion-item"
                            >
                                
                                <img 
                                src = {"https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/" + champion.id +".png"}
                                alt = "Failed to load profile of champion" //Show profile picture as well
                                className='list-profilePic'
                                ></img>
                                {champion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default SearchBar