const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema= new Schema({
    email:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required: true
    },
    likes:{
        type:Number,
        default: 0
    },
    dislikes:{
        type:Number,
        default:0
    },
    time:{
        type:Date,
        required:true
    }
})
module.exports = Postr = mongoose.model('Post',PostSchema);