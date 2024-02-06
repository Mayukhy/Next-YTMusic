import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required:true
    },
    name:{
        type:String,
        default:""
      },
      image:{
        type:String,
        default:""
      },
      fevArtists:{
        type:[String],
        default:[]
      },
      generationLimit:[
        {
          type: Schema.Types.ObjectId,
          ref: "Ailimit"
        }
      ],
      stripSessionId:{
        type:String
      },
      subcribtion:{
        type:Boolean,
        default:false
      },
      createdAt:{
         type:Date,
         default:new Date()
      },
  },
);

export default mongoose.models.User || mongoose.model("User", userSchema);