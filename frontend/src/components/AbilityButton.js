import React from 'react';

const AbilityButton = ({championData, abilitySpell,handleClick}) =>{
    return(
        <div class = "buttonContainer">
            <h3>{abilitySpell}</h3>
            <img src = {championData.abilities[abilitySpell].sprite} 
            alt = {`${abilitySpell} ability icon`}
            class = "abilityButton"
            onClick = {handleClick}>
            </img>
        </div>


    );
};

export default AbilityButton;