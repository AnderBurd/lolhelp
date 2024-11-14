import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AbilityVid from './AbilityVid.js';
import AbilityButton from './AbilityButton.js';
import '../styles/ChampInfoScreen.css'

const Champion = ({ name }) => {
    const [championData, setChampionData] = useState(null);
    const [error, setError] = useState(null);
    const[abilityVideo, setAbilityVideo] = useState("passive")

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
        setAbilityVideo(spellName)
    }

    function cleanText(myText){
        return myText
        .replace(/<[^>]+>/g)
        .replace(/undefined/g, ' ')
    }

    return (
        <div class = "containerChampion">
            <div class = "profile">
                <img src = {championData.profileImg} alt = "Couldnt load" class = "champPic"></img>  
                <h2 class = "champName">{championData.name}</h2>          
            </div>

            <div class = "abilityShowcase">
                <div class = "description">
                    <div class = "abilityButtons">
                        <AbilityButton championData={championData} abilitySpell="passive"handleClick = {()=>changeVideo("passive")}/>
                        <AbilityButton championData={championData} abilitySpell="Q" handleClick = {()=>changeVideo("Q")}/>
                        <AbilityButton championData={championData} abilitySpell="W"handleClick = {()=>changeVideo("W")}/>
                        <AbilityButton championData={championData} abilitySpell="E"handleClick = {()=>changeVideo("E")}/>
                        <AbilityButton championData={championData} abilitySpell="R"handleClick = {()=>changeVideo("R")}/>
                    </div>
                    <h2>{championData.abilities[abilityVideo].name + "(" + abilityVideo + ")"}</h2>
                    <p3>{cleanText(championData.abilities[abilityVideo].description)}</p3>
                </div>
                <AbilityVid championData={championData} abilitySpell={abilityVideo}/>
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