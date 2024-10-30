import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        </div>
    );
};

export default Champion;