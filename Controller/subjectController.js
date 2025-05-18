import { handleError } from "../Helpers/handleError.js"
import Subject from "../Models/subjectModel.js"


export const addSubject = async (req, res, next) => {
    try {
        const {name, subjectCode} = req.body
        const subject = new Subject({
            name,
            subjectCode
        })
        await subject.save()

        res.status(200).json({
            success: true,
            message: "Subject added successfully."
        })
    } catch (error) {
        next(handleError(500, error.message))   
    }
}

export const editSubject = async (req, res, next) => {
    try {
        const {subjectId} = req.params
        const {name, subjectCode} = req.body
        const subject = await Subject.findByIdAndUpdate(subjectId, {
            name,
            subjectCode
        }, {new: true})
        res.status(200).json({
            success: true,
            message: "Subject updated successfully.",
            subject
        })
    } catch (error) {
        next(handleError(500, error.message))
        
    }
}


export const showAllSubjects = async (req, res, next) => {
    try {
        const subject = await Subject.find().sort({name: 1}).lean().exec()
        res.status(200).json({
            subject
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const deleteSubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    await Subject.findByIdAndDelete(subjectId);
    res.status(200).json({
      success: true,
      message: "Subject deleted successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
  