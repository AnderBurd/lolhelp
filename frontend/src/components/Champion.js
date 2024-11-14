import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AbilityVid from './AbilityVid';

const Champion = ({ name }) => {
    const [championData, setChampionData] = useState(null);
    const [error, setError] = useState(null);

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

    return (
        <div>
            <h2>{championData.name}</h2>
            <h3>Abilities</h3>
            <img src = {championData.profileImg} alt = "Couldnt load"></img>
            <img src = {championData.championSplash} alt = "Couldnt load"></img>
            <ul>
                {Object.keys(championData.abilities).map((ability) => (
                    <li key={ability}>
                        <strong>{ability}</strong>: {championData.abilities[ability].description}
                    </li>
                ))}
            </ul>
            <h3>Tips</h3>
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
            </ul>
            <h3>Passive</h3>
            <h4>{championData.passive.name}</h4>
            <p3>{championData.passive.description}</p3>
            <img src = {championData.passive.sprite} alt = "Could not load passive"></img>
            <h3>Champion spells</h3>
            <AbilityVid championData={championData} abilitySpell="Q"/>
            <AbilityVid championData={championData} abilitySpell="W"/>
        </div>
    );
};

export default Champion;