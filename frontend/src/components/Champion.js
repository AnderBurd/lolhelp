import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AbilityVid from './AbilityVid.js';
import AbilityButton from './AbilityButton.js';
import KeyAbilitiesCard from './KeyAbilitiesCard.js';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/ChampInfoScreen.css'

const Champion = ({ name }) => {
    const [championData, setChampionData] = useState(null);
    const [error, setError] = useState(null);
    //Used to keep track of the selected spell, for the video player
    const[selectedSpell, setSelectedSpell] = useState("passive")

    const navigate = useNavigate();

    useEffect(() => {
        const fetchChampionData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/champion/"+name);
                setChampionData(response.data);
            } catch (err) {
                setError('Champion not found');
            }
        };

        fetchChampionData();
    }, [name]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!championData) {
        return <div className = "loading">Loading...</div>;
    }

    //Used to change the selected spell
    function changeVideo(spellName){
        setSelectedSpell(spellName)
    }

    function cleanText(myText){
        return myText
        .replace(/<[^>]+>/g)
        .replace(/undefined/g, ' ')
    }


    return (
        <div className = "containerChampion">
            <FaArrowLeft className='backButton' onClick = {()=>navigate("/")}/>
            <div className = "profile">
                <img src = {championData.profileImg} alt = "Couldnt load" class = "champPic"></img>  
                <h2 className = "champName">{championData.name}</h2>          
            </div>

            <div className = "abilityShowcase">
                <div className = "description">
                    <div className = "abilityButtons">
                        <AbilityButton championData={championData} 
                        abilitySpell="passive" 
                        isSelected = {selectedSpell === "passive"}
                        handleClick = {()=>changeVideo("passive")}/>

                        <AbilityButton championData={championData} 
                        abilitySpell="Q" 
                        isSelected = {selectedSpell === "Q"}
                        handleClick = {()=>changeVideo("Q")}/>

                        <AbilityButton championData={championData} 
                        abilitySpell="W" 
                        isSelected = {selectedSpell === "W"}
                        handleClick = {()=>changeVideo("W")}/>

                        <AbilityButton championData={championData} 
                        abilitySpell="E" 
                        isSelected = {selectedSpell === "E"}
                        handleClick = {()=>changeVideo("E")}/>

                        <AbilityButton championData={championData} 
                        abilitySpell="R" 
                        isSelected = {selectedSpell === "R"}
                        handleClick = {()=>changeVideo("R")}/>
                    </div>
                    <h2>{championData.abilities[selectedSpell].name + "(" + selectedSpell + ")"}</h2>
                    <p3>{cleanText(championData.abilities[selectedSpell].description)}</p3>
                    <p2>Cooldown</p2>
                    <p4>{championData.abilities[selectedSpell].cooldownBurn} Seconds</p4>
                </div>
                <AbilityVid championData={championData} abilitySpell={selectedSpell}/>
            </div>
            <div>
                <h1>Key Abilities</h1>
                <div className='keyAbilitiesContainer'>
                    {championData.keySpells.map((spell, index)=>(
                        <KeyAbilitiesCard
                        championData={championData} 
                        spell = {spell}
                        isSelected = {selectedSpell === spell}
                        handleClick = {()=>changeVideo(spell)}
                        currentSpell = {index} // Used to know right index for tip
                        />
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Champion;