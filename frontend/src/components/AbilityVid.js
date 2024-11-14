import React from 'react';

const AbilityVid = ({championData, abilitySpell}) =>{
    return(
        <div class = "videoContainer">
            <video src = {championData.videos[abilitySpell]} 
            type = "video/mp4" 
            video controls
            width="680"
            height = "470">
            </video>
        </div>
    );
};

export default AbilityVid;