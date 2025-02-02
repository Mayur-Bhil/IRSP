import mongoose, { model, Schema,models } from "mongoose";
import brcypt from "bcryptjs"

export interface Iuser{
    email:string,
    password:string,    
    _id?:mongoose.Types.ObjectId;
    createdAt?:Date,
    updatedAt?:Date
}



const userSchema = new Schema<Iuser>(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,

        }
    },
    {
        timestamps:true
    }
);


userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await brcypt.hash(this.password,10);
    }
})

const User = models?.User || model<Iuser>("User",userSchema)