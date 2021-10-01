const router = require('express').Router();
const _ = require('lodash');
const {Course, valdiate_course, valdiate_update_course} = require('../models/course');
const Author = require('../models/author');

router.get('',async (req,res) => {
    res.send(await Course.find());
});

router.get('/:id',async (req,res) => {
    let course = await Course.findById(req.params.id)
                                .populate('author.id')
    res.send(course);
});

router.post('',async (req,res) => {
    let validation = valdiate_course(req.body);
    if(validation.error)
        return res.status(400).send(validation.error.details[0].message);
    
    let author = await Author.findById(req.body.author.id);
    if(!author)
        return res.status(400).send("Author id is not found");
    req.body.author.name = author.name;
    let course = new Course(_.pick(req.body,'title','author','tags','price','isPublished'));
    try {
        course = await course.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(course);
});


router.put('/:id',async (req,res) => {
    let validation = valdiate_update_course(req.body);
    if(validation.error)
        return res.status(400).send(validation.error.details[0].message);
    let course = await Course.findById(req.params.id);
    /* if(req.body.title)
        course.title = req.body.title
    if(req.body.author)
        course.author = req.body.author
    .... => use merges */
    course = _.merge(course,req.body);
    course = await course.save();
    res.send(course);
});

router.delete('/:id',async (req,res) => {
    let course = await Course.findById(req.params.id)
    await Course.deleteOne({_id: req.params.id})
    res.send(course);
});
module.exports = router;