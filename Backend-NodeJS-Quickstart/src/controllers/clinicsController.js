import clinicServices from '../services/clinicServices'


let createNewMedicalFacilities = async (req, res) => {
    try {
        let response = await clinicServices.createNewMedicalFacilities(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
            
        })
    }
}

let getMedicalFacilities = async(req,res) => {
  
    try {
        let clinics = await clinicServices.getMedicalFacilities();
        return res.status(200).json(clinics);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}


let getMedicalFacilitiesById = async(req,res) => {
  
    try {
        let clinics = await clinicServices.getMedicalFacilitiesById(req.query.id);
        return res.status(200).json(clinics);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}


let saveInfoMedicalFacilities = async (req, res) => {
    try {
        let response = await clinicServices.saveInfoMedicalFacilities(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
            
        })
    }
}


let deleteMedicalFacilities = async(req,res) => {
    try {
        let data = await clinicServices.deleteMedicalFacilities(req.query.id);
       
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
    getMedicalFacilities: getMedicalFacilities,
    createNewMedicalFacilities:createNewMedicalFacilities,
    getMedicalFacilitiesById: getMedicalFacilitiesById,
    saveInfoMedicalFacilities: saveInfoMedicalFacilities,
    deleteMedicalFacilities: deleteMedicalFacilities
    
}