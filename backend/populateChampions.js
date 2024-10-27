const mongoose = require('mongoose');
const axios = require('axios');
const Champion = require('./models/champion');

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://megapixeldrago:iMxDIC5ssOL4hb0H@lolhelp.l1ll8.mongodb.net/?retryWrites=true&w=majority&appName=lolhelp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

const fetchChampionData = async () => {
    try {
      // Fetch the list of champions
      const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/champion.json');
      const champions = response.data.data;
  
      // Clear existing champions in the database
      await Champion.deleteMany({});
  
      // Array to hold champion documents
      const championDocuments = [];
  
      // Loop through each champion to fetch detailed data
      for (const championKey in champions) {
        const championResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/champion/${championKey}.json`);
        const championData = championResponse.data.data[championKey];
  
        // Map the fetched data to your schema
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
                cooldownBurn: championData.passive.cooldownBurn || "N/A" // Default to "N/A" if not available
              },
              Q: {
                name: championData.spells[0].name,
                description: championData.spells[0].description,
                cooldownBurn: championData.spells[0].cooldownBurn, // Store cooldownBurn directly
              },
              W: {
                name: championData.spells[1].name,
                description: championData.spells[1].description,
                cooldownBurn: championData.spells[1].cooldownBurn, // Store cooldownBurn directly
              },
              E: {
                name: championData.spells[2].name,
                description: championData.spells[2].description,
                cooldownBurn: championData.spells[2].cooldownBurn, // Store cooldownBurn directly
              },
              R: {
                name: championData.spells[3].name,
                description: championData.spells[3].description,
                cooldownBurn: championData.spells[3].cooldownBurn, // Store cooldownBurn directly
              }
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