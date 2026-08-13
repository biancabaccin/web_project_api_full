const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Your Name :)",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Who are you?",
  },
  avatar: {
    type: String,
    default: "https://picsum.photos/350",
    validate: {
      validator: function (v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=-]+#?$/.test(
          v,
        );
      },
      message: "Invalid avatar URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
