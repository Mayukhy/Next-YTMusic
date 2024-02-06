
import mongoose from "mongoose";

const { Schema } = mongoose;

const playlistSchema = new Schema(
  {

    userMail:{
        type:String,
        required:true,
      },

       title:{
        type:String,
        required:true,
        unique:true
      },
      desc:{
        type:String,
        default:""
      },
      createdAt:{
         type:Date,
         default:new Date()
      },
  },
);

export default mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);