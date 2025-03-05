const mongoose = require("mongoose");
const getNextSequenceValue = require("./Counter");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: Number, unique: true },
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.userId = await getNextSequenceValue("user", "userId");
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
