import mongoose from "mongoose";

const assignmentsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        course: { type: String, required: true },
        description: { type: String },
        points: { type: Number },
        dueDate: { type: String },
        availableFrom: { type: String },
        availableUntil: { type: String }

    },
    { 
        collection: "assignments" 
    }
    );
export default assignmentsSchema;
