// import the necessary packages
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;



var PromoSchema = new Schema({
    name:{
        type:String,
        required:true

    },
    image:{
        type:String,
        required:true

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


var Promotions = mongoose.model('Promotion',PromoSchema);
module.exports = Promotions;
