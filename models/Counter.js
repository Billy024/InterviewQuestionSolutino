const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  model: { type: String, required: true },
  field: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

async function getNextSequenceValue(modelName, fieldName) {
  const counter = await Counter.findOneAndUpdate(
    { model: modelName, field: fieldName },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequenceValue;
}

module.exports = getNextSequenceValue;
