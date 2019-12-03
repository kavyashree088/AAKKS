var mongoose =require('mongoose');
const Temp = mongoose.Schema({
    likes:{
        type: Number
    },
    retweets:{
        type: Number
    },
    views:{
        type: Number
    },
    createdAt:{
        type:Number
    }

},{ collection: 'Temp' ,timestamps:true})

module.exports = mongoose.model('Temp', Temp);