import React from 'react';
import Champion from '../components/Champion';
import { useParams } from 'react-router-dom';
import '../styles/ChampInfoScreen.css'

const ChampInfoScreen = () =>{
    const {championName} = useParams(); //Grab the champion name from the search
    console.log(championName)
    return(
        <div class = "container">
            {/*Render out champion component based on the championName*/}
            {championName && <Champion name = {championName}/>} 
        </div>
    );
}

export default ChampInfoScreen;