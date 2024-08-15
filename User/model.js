import mongoose from "mongoose";
import userSchema from "./schema.js";  // Import the user schema

const User = mongoose.model('User', userSchema);  // Define the model using the schema

export default User;

