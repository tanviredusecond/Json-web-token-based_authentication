// import the necessary packages
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;



var LeaderSchema = new Schema({
    name:{
        type:String,
        required:true

    },
    image:{
        type:String,
        required:true

    },
    designation:{
        type:String,
        default:''

    },
    abbr:{
        type:Currency,
        required:false,
        min:0
    },
    description:{
        type:String,
        required:true,
    },
     fetured:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});


var Leaders = mongoose.model('Leader',LeaderSchema);
module.exports = Leaders;
