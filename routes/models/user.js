const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// find and validate the user
userSchema.statics.findAndValidate = async function (username, password) {
  const user = await this.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : false;
};

// hash the password before saving to mongoDB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
