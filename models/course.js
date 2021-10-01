const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = new mongoose.Schema({
    title : {type :String, required:true},
    author : {
        id : { type : mongoose.Schema.Types.ObjectId, ref: 'Author'}
        , name : String 
    },
    price : {type : Number, required: function(){return this.isPublished}, min :10, max :300},
    tags : {type : [String] , validate : { validator:function (v){
        return v.length > 0
    }, message : "A course must have at least one tag"}},
    date : {type : Date, default : Date.now()},
    isPublished : Boolean
});

const Course = mongoose.model('Course',courseSchema);

let course_validation_schema = {
    title : Joi.string().required(),
    author : {
        id :Joi.string(),
        name :Joi.string()
    },
    price: Joi.number().min(10).max(300),
    tags : Joi.array().items(Joi.string()),
    isPublished : Joi.boolean()
}

let course_validation_schema_update = {
    title : Joi.string(),
    author : {
        id :Joi.string(),
        name :Joi.string()
    },
    price: Joi.number().min(10).max(300),
    tags : Joi.array().items(Joi.string()),
    isPublished : Joi.boolean()
}
function valdiate_course(body){
    return Joi.validate(body,course_validation_schema);
}
function valdiate_update_course(body){
    return Joi.validate(body,course_validation_schema_update);
}
module.exports.Course = Course;
module.exports.valdiate_course = valdiate_course;
module.exports.valdiate_update_course = valdiate_update_course;