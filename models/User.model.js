const {
  Schema,
  model
} = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  records: [String],
  //  avatar: {
  //    enum: [img1]
  //  },
  wishList: [String],
  aboutMe: String,
  city: String,
  country: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
});

const User = model("User", userSchema);

module.exports = User;