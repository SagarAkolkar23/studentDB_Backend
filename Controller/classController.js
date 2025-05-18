import { handleError } from "../Helpers/handleError.js";
import classModel from "../Models/classModel.js";



export const Create = async (req, res, next) => {
    try {
        const {name, section, teacherId} = req.body;
        const _class = new classModel({
            name, 
            section,
            teacherId
        })

        await _class.save()
        res.status(200).json({
            success: true,
            message: "Class added successfully",
            data: _class
        })
        
    } catch (error) {
         next(handleError(500, error.message))
    }
} 


export const getAllClass = async (req, res, next) => {
    try {
        const _class = await classModel.find().sort({name: 1}).lean().exec()
        res.status(200).json({
            _class
        })
        
    } catch (error) {
         next(handleError(500, error.message))
    }
}


export const deleteClass = async (req, res, next) => {
    try {
        const {classId} = req.params
        await classModel.findByIdAndDelete(classId)
        res.status(200).json({
            success: true,
            message: "Class deleted"
        })
    } catch (error) {
         next(handleError(500, error.message))
        
    }
}


export const updateClass = async (req, res, next) => {
    try {
        const {classId} = req.params
        const {name} = req.body
        const _class = await classModel.findByIdAndUpdate(classId, {
            name
        },{new: true})
        res.status(200).json({
            success: true,
            message: "Class updated successfully",
            _class
        })
    } catch (error) {
         next(handleError(500, error.message))
        
    }
}


export const getClassByTeacherId = async (req, res, next) => {
    try {
        const {teacherId} = req.params

        const _class = await classModel.find({teacherId})
        .populate("teacherId", "name number")
        .sort({createdAt: 1})
        .lean()
        .exec()

        res.status(200).json({
            success: true,
            _class 
        })
    } catch (error) {
        next(handleError(500, error.message))
        
    }
}