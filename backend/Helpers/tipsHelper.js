//This file contains helper files for adding and getting tips for champions

const Champion = require('../models/champion');
const Tip = require('../models/tips');

//Used to add tips for a champ
async function addTipsForChampion(championName,newTips,keySpells){
    try{
        //Check if champion name exists in Champion
        const champion = await Champion.findOne({name: championName});
        if(!champion){
            console.log("Champion does not exist");
            return;
        }
        //new tip object
        const tips = new Tip({
            championId: champion._id,
            tips: newTips,
            keySpells: keySpells
        });
        //Save data
        await tips.save();
        console.log("Tips and key spells added sucessfuly")
    }
    catch(error){
        console.error("Error adding tips and key spells:", error)
    }
}

//Used to get tips for a champ
async function getTipsForChampion(championName){
    try{
        const champion = await Champion.findOne({name: championName});
        if(!champion){
            console.log("Champion does not exist");
            return;
        }
        //Grab the tips, if there isnt any say no tips available
        const tips = await Tip.findOne({championId:champion._id});
        return tips ? tips.tips : "No tips available";
    }
    catch(error){
        console.error("Error when fetching tips:",error);
    }
}

module.exports = {addTipsForChampion,getTipsForChampion};