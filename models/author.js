const mongoose = require('mongoose');
const Joi = require('joi');

const authorSchema = new mongoose.Schema({
    name : {type :String, required:true},
    email : {type :String, required:true},
    address : String
});

const Author = mongoose.model('Author',authorSchema);

module.exports = Author
// moodelling 
// Trade off between performance vs consistency

// normalize format ( consitency)
// author       
// course ( author : id_author)

// Embedeed ( performance )
// course {
//  author :{
//
//}
//}

// Hybrid
// course { author : {id : id_author, name : 'xyz'}}