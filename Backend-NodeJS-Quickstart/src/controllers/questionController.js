
import questionServices from "../services/questionServices"


let createNewQuestion = async (req, res) => {
    try {
        let response = await questionServices.createNewQuestion(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
            
        })
    }
}

let getQuestion = async(req,res) => {
  
    try {
        let specialty = await questionServices.getQuestion();
        return res.status(200).json(specialty);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getReply = async(req,res) => {
  
    try {
        let specialty = await questionServices.getReply();
        return res.status(200).json(specialty);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}
let search = async(req,res) => {
  
    try {
        let specialty = await questionServices.search(req.query.searchTerm);
        return res.status(200).json(specialty);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getQuestionById = async(req,res) => {
  
    try {
        let question = await questionServices.getQuestionById(req.query.id);
        return res.status(200).json(question);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getDoctorInfo = async(req,res) => {
  
    try {
        let doctorInfo = await questionServices.getDoctorInfo();
        return res.status(200).json(doctorInfo);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let sendQuestion = async(req,res) => {
  
    try {
        let response = await questionServices.sendQuestion(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }

}



module.exports = {
    createNewQuestion: createNewQuestion,
    getQuestion: getQuestion,
    search: search,
    getQuestionById: getQuestionById,
    getDoctorInfo: getDoctorInfo,
    sendQuestion: sendQuestion,
    getReply: getReply
}