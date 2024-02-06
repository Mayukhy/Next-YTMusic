
import mongoose from "mongoose";

const { Schema } = mongoose;

const AilimitSchema = new Schema(
  {
    userMail:{
        type:String,
        required:true,
      },
    prompt:{
        type:String
    },
      createdAt:{
         type:Date,
         default:new Date()
      },
  },
);

export default mongoose.models.Ailimit || mongoose.model("Ailimit", AilimitSchema);