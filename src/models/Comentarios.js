const {Schema, model} = require('mongoose')

const CommentSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    like:{
        type: String,
        required: false
    },
    idUser:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = model ('Comments', CommentSchema);