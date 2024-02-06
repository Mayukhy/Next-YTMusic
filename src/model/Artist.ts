
import mongoose from "mongoose";

const { Schema } = mongoose;

const artistSchema = new Schema(
  {

       name:{
        type:String,
        default:""
      },
      image:{
        type:String,
        default:""
      },
      createdAt:{
         type:Date,
         default:new Date()
      },
  },
);

export default mongoose.models.Artist || mongoose.model("Artist", artistSchema);