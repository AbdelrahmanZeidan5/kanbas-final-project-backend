import model from "./model.js";

export const createUser = (user) => {
    delete user._id
    return model.create(user);
};
export const findAllUsers = () => model.find();
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

// Add the following method to handle course enrollment
export const addCourseToStudent = async (username, courseNumber) => {
  try {
    const updatedUser = await model.findOneAndUpdate(
      { username },
      { $addToSet: { enrolledCourses: courseNumber } }, // Add the course number instead of the ID
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  } catch (error) {
    console.error('Error adding course to student:', error);
    throw error;
  }
};
