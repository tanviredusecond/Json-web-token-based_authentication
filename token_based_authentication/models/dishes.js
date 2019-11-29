
// import the necessary packages
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

// make the database schema

var commentSchema = new Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true,
    },
    comment:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }

},{
    timestamps:true
})



var dishSchema = new Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:false,
    },
    label:{
        type:String,
        default:''
    },
    price:{
        type:Currency,
        required:false,
        min:0
    },
    fetured:{
        type:Boolean,
        default:false
    },
    comments:[commentSchema]
},{
    timestamps:true
});


// create the model export the model
var Dishes = mongoose.model('Dish',dishSchema);
module.exports = Dishes;
