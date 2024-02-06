
import mongoose from "mongoose";

const { Schema } = mongoose;

const userfevSongSchema = new Schema(
  {
    title:{
        type:String,
        required:true,
      },
    userMail:{
        type:String,
        required:true,
      },
      id:{
        type:String,
        required:true,
      },
      imgUrl:{
        type:String
      },
      artist:{
        type:String,
        required:true,
      },
      songUrl:{
        type:String
      },
      listencount:{
       type:Number,
       default:1
      },
      createdAt:{
         type:Date,
         default:new Date()
      },
  },
);

export default mongoose.models.UserfevSong || mongoose.model("UserfevSong", userfevSongSchema);