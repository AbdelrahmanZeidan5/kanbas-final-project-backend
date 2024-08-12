import model from "./model.js";

export const createModule = (module) => {
    delete module._id
    return model.create(module);
}
export const findAllModules = () => model.find();
export const findModuleById = (moduleId) => model.findById(moduleId);
export const updateModule = (moduleId, module) => model.updateOne({ _id: moduleId }, { $set: module });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });
export const findModulesByCourse = (course) => model.find({ course: course });

export const findModulesByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ name: { $regex: regex } }],
    });
}

