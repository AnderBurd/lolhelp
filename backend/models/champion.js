
const mongoose = require('mongoose');

const abilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  avoid_tips: String,
  cooldownBurn: { type: String, required: true },
});

const championSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  key: { type: String, required: true },
  name: { type: String, required: true },
  abilities: {
    Q: abilitySchema,
    W: abilitySchema,
    E: abilitySchema,
    R: abilitySchema
  },
  tips: [String],
  keySpells: [String]
});

const Champion = mongoose.model('Champion', championSchema);

module.exports = Champion;