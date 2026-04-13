const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);
UserSchema.pre("save", async function (next) {
 
  if (!this.isModified("password")) return next(); //helps to check that password hashing only happens when the password is created or changed,

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //hashing by the help of salt
});
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);