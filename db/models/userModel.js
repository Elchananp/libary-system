import mongoose from "mongoose";

//  user fields name id role mail password isActive

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isLoanActive: {
    type: Boolean,}
});

// example user:
// {
//   firstName: "John",
//   lastName: "Doe",   
//   role: "user",
//   mail: "hgf@.com",
//   password: 1234,
//   isActive: true,
//   isLoanActive: false
// }

const User = mongoose.model("User", userSchema);
export default User;
