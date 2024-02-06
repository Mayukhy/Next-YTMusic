
import mongoose from "mongoose";

const { Schema } = mongoose;

const AimusicSchema = new Schema(
  {
    title:{
        type:String,
        required:true,
      },
    userMail:{
        type:String,
        required:true,
      },
      imgUrl:{
        type:String
      },
      songUrl:{
        type:String
      },
      createdAt:{
         type:Date,
         default:new Date()
      },
  },
);

export default mongoose.models.Aimusic || mongoose.model("Aimusic", AimusicSchema);