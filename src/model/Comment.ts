import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    //the project where user is commenting on
    projectId: {
      type: String,
    },
    //loggedin userMail,name,image
    useremail: {
      type: String,
    },
    name:{
        type:String,
        default:""
      },
      image:{
        type:String,
        default:""
      },
      comment:{
        type:String,
        default:""
      },
      createdAt:{
         type:Date,
         default:new Date()
      },
  },
);

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);