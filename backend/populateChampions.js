const mongoose = require('mongoose');
const axios = require('axios');
const Champion = require('./models/champion');
const tipsData = require('./data/tipsData');
require('dotenv').config();

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

const fetchChampionData = async () => {
    try {
      // Fetch the list of champions
      const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json');
      const champions = response.data.data;
  
      // Clear existing champions in the database
      await Champion.deleteMany({});
  
      // Array to hold champion documents
      const championDocuments = [];
  
      // Loop through each champion to fetch detailed data
      for (const championKey in champions) {
        const championResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion/${championKey}.json`);
        const championData = championResponse.data.data[championKey];

        //Grab tips and keySpells as well, default to empty
        const championTips = tipsData.find(tip => tip.name == championData.name) || {};
        const tips = championTips.tips ? championTips.tips : [];
        const keySpells = championTips.keySpells ? championTips.keySpells : [];
  
        // Map the fetched data to champion schema
        const championDocument = {
          id: championData.id,
          key: championData.key,
          name: championData.name,
          title: championData.title,
          lore: championData.lore,
          abilities: {
            passive: {
                name: championData.passive.name,
                description: championData.passive.description,
                cooldownBurn: championData.passive.cooldownBurn || "N/A", // Default to "N/A" if not available
                sprite: "https://ddragon.leagueoflegends.com/cdn/14.22.1/img/passive/" + championData.passive.image.full
              },
              Q: {
                name: championData.spells[0].name,
                description: championData.spells[0].description,
                cooldownBurn: championData.spells[0].cooldownBurn,
                sprite: "https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/"+championData.spells[0].image.full
              },
              W: {
                name: championData.spells[1].name,
                description: championData.spells[1].description,
                cooldownBurn: championData.spells[1].cooldownBurn,
                sprite: "https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/"+championData.spells[1].image.full
              },
              E: {
                name: championData.spells[2].name,
                description: championData.spells[2].description,
                cooldownBurn: championData.spells[2].cooldownBurn,
                sprite: "https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/"+championData.spells[2].image.full
              },
              R: {
                name: championData.spells[3].name,
                description: championData.spells[3].description,
                cooldownBurn: championData.spells[3].cooldownBurn, 
                sprite: "https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/"+championData.spells[3].image.full
              }
          },
          tips: tips,
          keySpells: keySpells,
          profileImg: "https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/"+championData.image.full,
          championSplash: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + championData.name + "_0.jpg",
          passive: {
            name: championData.passive.name,
            description: championData.passive.description,
            sprite: "https://ddragon.leagueoflegends.com/cdn/14.22.1/img/passive/" + championData.passive.image.full
          },
          videos: {
            passive: "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0" + championData.key + "/ability_0" + championData.key + "_P1.mp4", //Taken from league of legends champions website
            Q:"https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0" + championData.key + "/ability_0" + championData.key + "_Q1.mp4",
            W:"https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0" + championData.key + "/ability_0" + championData.key + "_W1.mp4",
            E:"https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0" + championData.key + "/ability_0" + championData.key + "_E1.mp4",
            R:"https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0" + championData.key + "/ability_0" + championData.key + "_R1.mp4"
          }
        };
  
        // Push the document to the array
        championDocuments.push(championDocument);


        console.log(`${championData.name} fetched successfully`);
      }
 
      // Insert all champion documents into the database at once
      await Champion.insertMany(championDocuments);
      console.log('All champions stored successfully');
    } catch (error) {
      console.error('Error fetching or storing champion data:', error);
    }
  };
  
  const main = async () => {
    await connectDB();
    await fetchChampionData();
    mongoose.connection.close(); // Close connection after operation
  };
  main();