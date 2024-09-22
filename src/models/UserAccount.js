import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema(
  {
    publicAddress: {
      type: String,
      required: true,
      unique: true,
    },
    lamports: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserAccount =
  mongoose.models.UserAccount ||
  mongoose.model("UserAccount", userAccountSchema);

export default UserAccount;
