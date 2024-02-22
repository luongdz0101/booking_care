import doctorServices from "../services/doctorServices"

let getTopDoctorHome = async(req,res) => {
 
    try {
        let response = await doctorServices.getTopDoctorHome(); 
        return res.status(200).json(response);
    } catch (error) {
       
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server..."
        })
    }
}

let getAllDoctor = async(req,res) => {
  
    try {
        let doctors = await doctorServices.getAllDoctor();
       
        return res.status(200).json(doctors);
    } catch (error) {
    
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let postInfoDoctor = async(req,res) => {
  
    try {
        let response = await doctorServices.saveInfoDoctor(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }

}



let getDetailDoctorById = async(req,res) => {
  
    try {
        let info = await doctorServices.getDoctorById(req.query.id);
        return res.status(200).json(info);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}


let bulkCreateSchedule = async(req,res) => {
  
    try {
        let info = await doctorServices.saveBulkCreateSchedule(req.body);
        return res.status(200).json(info);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }

}


let getScheduleByDate = async(req,res) => {
  
    try {
        let info = await doctorServices.getScheduleDate(req.query.doctorId, req.query.date);
      
        return res.status(200).json(info);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}


let getProfileDoctorById = async(req,res) => {
  
    try {
        let info = await doctorServices.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(info);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}

let getListPatient = async(req,res) => {
  
    try {
        let info = await doctorServices.getListPatient(req.query.doctorId, req.query.date);
      
        return res.status(200).json(info);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}


let sendRemedy = async(req,res) => {
  
    try {
        let response = await doctorServices.postSendRemedy(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }

}




let getExtraInfoById = async(req,res) => {
  
    try {
        let info = await doctorServices.getExtraInfoById(req.query.doctorId);
      
        return res.status(200).json(info);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}


module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInfoDoctor: postInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getProfileDoctorById: getProfileDoctorById,
    getListPatient: getListPatient,
    sendRemedy: sendRemedy,
    getExtraInfoById: getExtraInfoById,
  
}