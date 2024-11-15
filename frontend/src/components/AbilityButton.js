import React from 'react';

const AbilityButton = ({championData, abilitySpell,handleClick, isSelected}) =>{
    return(
        <div className = "buttonContainer">
            <h3>{abilitySpell}</h3>
            <img src = {championData.abilities[abilitySpell].sprite} 
            alt = {`${abilitySpell} ability icon`}
            className = {`abilityButton ${isSelected ? 'selected' : ''}`} //check if spell is selected for border
            onClick = {handleClick}>
            </img>
        </div>


    );
};

export default AbilityButton;