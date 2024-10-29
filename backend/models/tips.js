const mongoose = require('mongoose')

const tipsSchema = new mongoose.Schema({
    championId:{type:mongoose.Schema.Types.ObjectId, ref:'Champion'},
    tips: [String],
    keySpells: [String]
});

const Tip = mongoose.model("Tip",tipsSchema);
module.exports = Tip;