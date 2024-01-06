
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


let search = async(req,res) => {
  
    try {
        let specialty = await questionServices.search(req.body.searchTerm);
        return res.status(200).json(specialty);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}


// let getDetailSpecialtyById = async(req,res) => {
  
//     try {
//         let specialty = await patientService.getDetailSpecialtyById(req.query.id, req.query.location);
//         return res.status(200).json(specialty);
//     } catch (error) {
    
//         return res.status(200).json({
//             errCode: -1,
//             message: "Error from server..."
//         })
//     }
// }

// let saveInfoSpecialty = async (req, res) => {
//     try {
//         let response = await patientService.saveInfoSpecialty(req.body);
//         return res.status(200).json(response);

//     } catch (error) {
//         console.log(error)
//         return res.status(200).json({
//             errCode: -1,
//             message: "Error from server..."
            
//         })
//     }
// }


// let handleDeleteSpecialty = async(req,res) => {
//     try {
//         let data = await patientService.handleDeleteSpecialty(req.query.id);
       
//         return res.status(200).json(data)
        
//     } catch (error) {
//         console.log(error);
//         return res.status(200).json({
//             errCode: '1',
//             errMessage: 'Error form server'
//         })
//     }
// }



module.exports = {
   

    
    createNewQuestion: createNewQuestion,
    getQuestion: getQuestion,
    search: search
}