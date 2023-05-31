import mongoose from 'mongoose';

// a stat from a single game
const statSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  accuracy: Number,
  wpm: Number,
  timeArray:[Number] // for generating the graph
});

const Stat = mongoose.model('Stat', statSchema);

export default Stat;
