const {
  Schema,
  model
} = require("mongoose");

const recordSchema = new Schema({
  artist: String,
  title: String,
  image: String,
  trackList: Array,
  releaseYear: Number,
  notes: String
})

const Record = model("Record", recordSchema);

module.exports = Record;