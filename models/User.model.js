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
  record: {
    type: Schema.Types.ObjectId,
    ref: 'Record'
  },
  // avatar: {
  //   enum: 
  // },
  wishList: {
    type: Schema.Types.ObjectId,
    ref: 'Record'
  },
  aboutMe: String,
  location: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
});

const User = model("User", userSchema);

module.exports = User;