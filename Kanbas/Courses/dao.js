import model from "./model.js";

export const createCourse = (course) => {
    delete course._id
    return model.create(course);
}
export const findAllCourses = () => model.find();
export const findCourseById = (courseId) => model.findById(courseId);
export const updateCourse = (courseId, course) => model.updateOne({ _id: courseId }, { $set: course });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });


export const findCoursesByDepartment = (department) => model.find({ department: department });
export const findCoursesByNumber = (number) => model.find({ number: number });

export const findCoursesByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ name: { $regex: regex } }],
    });
};
