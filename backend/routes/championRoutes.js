const express = require('express');
const Champion = require('../models/champion');
const router = express.Router();

router.get('/:name', async (req, res) => {
  try {
    const championName = req.params.name;
    // Use a case-insensitive regex to find the champion
    const champion = await Champion.findOne({ name: new RegExp(championName, 'i') });
    if (champion) {
      res.json(champion);
    } else {
      res.status(404).json({ message: 'Champion not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching champion data' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newChampion = new Champion(req.body);
    await newChampion.save();
    res.status(201).json(newChampion);
  } catch (error) {
    res.status(400).json({ message: 'Error adding champion' });
  }
});

module.exports = router;