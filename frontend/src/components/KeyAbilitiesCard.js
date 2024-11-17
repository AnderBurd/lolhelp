import React from 'react';
import AbilityButton from './AbilityButton';


const KeyAbilitiesCard = ({championData, spell, handleClick, isSelected, currentSpell}) =>{
  return(
    <div className='keyAbilityCard'>
    <AbilityButton
      championData={championData}
      abilitySpell={spell}
      handleClick={handleClick}
      isSelected={isSelected}
    />
    <p1>{championData.tips[currentSpell]}</p1>
  </div>
  )
};

export default KeyAbilitiesCard