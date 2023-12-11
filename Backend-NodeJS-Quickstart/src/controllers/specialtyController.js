
import patientService from "../services/specialtyServices"


let createNewSpecialty = async (req, res) => {
    try {
        let response = await patientService.createNewSpecialty(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
            
        })
    }
}







let getSpecialtyHome = async(req,res) => {
  
    try {
        let specialty = await patientService.getSpecialtyHome();
        return res.status(200).json(specialty);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getDetailSpecialtyById = async(req,res) => {
  
    try {
        let specialty = await patientService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(specialty);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let saveInfoSpecialty = async (req, res) => {
    try {
        let response = await patientService.saveInfoSpecialty(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
            
        })
    }
}


let handleDeleteSpecialty = async(req,res) => {
    try {
        let data = await patientService.handleDeleteSpecialty(req.query.id);
       
        return res.status(200).json(data)
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: '1',
            errMessage: 'Error form server'
        })
    }
}



module.exports = {
   

    createNewSpecialty: createNewSpecialty,
    getSpecialtyHome: getSpecialtyHome,
    getDetailSpecialtyById: getDetailSpecialtyById,
    saveInfoSpecialty: saveInfoSpecialty,
    handleDeleteSpecialty: handleDeleteSpecialty
   
}