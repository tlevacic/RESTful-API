const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const Student= require('../models/student');

//GET ALL STUDENTS
router.get('/',(req,res,next)=>{

    //GET ALL STUDENTS
    Student.find()
    .select('name lastName gender age address')
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            message: "Error occured",
            error: err
        });
    })
});

//GET ONE STUDENT
router.get('/:studentId',(req,res,next)=>{
    const id=req.params.studentId; //take id from route

    //GET STUDENT FROM DATABASE
    Student.findById(id)
    .select('id name lastname gender age address')
    .exec()
    .then(doc => {
        if(doc){ //if there is result for that id
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: "ID not found"});
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Error occured",
            error: err
        })
    });
});

//POST ALL STUDENTS
router.post('/',(req,res,next)=>{

    //CREATE NEW OBJECT FOR GIVEN DATA
    const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lastName: req.body.lastName,
        gender: req.body.gender,
        age: req.body.age,
        address: req.body.address
    });

    //STORE IN DATABASE
    student.save()
    .then(result => {  
        //MODIFY OUTPUT    
        const resObj={
            _id: result._id,
            name: result.name,
            lastName: result.lastName,
            gender: result.gender,
            age: result.age,
            address: result.address
        }    
        res.status(201).json({
            message: "Student stored successfully",
            createdStudent: resObj
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Storing not completed",
            error: err
        })
    })
});

//PATCH request- UPDATE one student
router.patch('/:studentId',(req,res,next)=>{
    const id=req.params.studentId;
    const updateParams= {};
    for(const  par in req.body){
        updateParams[par.propName]=par.value;
    }
    Student.update({_id: id}, {$set: updateParams})
    .exec()
    .then(result => {
        res.status(400).json({
            message: "Updating completed",
            updatedStudent: result
        })
    })
    .catch(err => {
        res.status(500).json({
            message:"Error occured",
            error: err
        })
    });
});

//DELETE request- delete one student
router.delete('/:studentId',(req,res,next)=>{
    const id=req.params.studentId;
    Student.remove({_id: id})
    .exec()
    .then(result =>
        {
            res.status(400).json({
                message: "Deleting completed",
                updatedStudentId: id
            })
        })
    .catch(err => {
        res.status(404).json({
            message: "Error occured",
            error: err
        })
    })
});


module.exports=router;