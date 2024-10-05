const mongoose= require("mongoose")
const UserSchemaMethod = require("./UserschemaMethod")

const UserSchema= new  mongoose.Schema({
    name:{
       type:String,
       required:true,
    },
    email:{
       type:String,
       required:true,
       unique:true
    },
    password:{
       type:String,
       required:true,
    },
    role:{
      type:String,
      required:true,
      enum: ['User',  'Admin'],
    }
},{
   timestamps:true
})
UserSchemaMethod(UserSchema)
 module.exports= mongoose.model('User',UserSchema)