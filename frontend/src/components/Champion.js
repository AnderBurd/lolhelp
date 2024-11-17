import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AbilityVid from './AbilityVid.js';
import AbilityButton from './AbilityButton.js';
import KeyAbilitiesCard from './KeyAbilitiesCard.js';
import '../styles/ChampInfoScreen.css'

const Champion = ({ name }) => {
    const [championData, setChampionData] = useState(null);
    const [error, setError] = useState(null);
    //Used to keep track of the selected spell, for the video player
    const[selectedSpell, setSelectedSpell] = useState("passive")

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
        return <div>Loading...</div>;
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
            <div className='keyAbilities'>
                <h1>Key Abilities</h1>
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


            {/* <h3>Tips</h3>
            <ul>{championData.tips.map((tip)=>(
                <li>
                   {tip} 
                </li>
            ))}
            </ul>

            <h3>Key spells</h3>
            <ul>{championData.keySpells.map((spell)=>(
                <li>
                    {spell} 
                </li>
            ))}
            </ul> */}
            {/* <h3>Passive</h3>
            <h4>{championData.passive.name}</h4>
            <p3>{championData.passive.description}</p3>
            <img src = {championData.passive.sprite} alt = "Could not load passive"></img>
            <h3>Champion spells</h3>
            */}
        </div>
    );
};

export default Champion;