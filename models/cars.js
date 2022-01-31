const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    car_name:{
        type:String,
        required:[true,'Please provide car name'],
        maxlenght:20
    },
    company:{
        type:String,
        required:[true,'Please provide company'],
        maxlenght:20
    }, 
    price:{
        type:Number,
        required:[true,'Please provide car price'],
        maxlenght:20
    },
    addedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide the user']
    },
    updatedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide the user']
    }
    
})

module.exports = mongoose.model("cars",carSchema)