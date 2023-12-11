
import patientService from "../services/patientService"


let postPatientBookingApp = async (req, res) => {
    try {
        let response = await patientService.postPatientBookApp(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
            
        })
    }
}


let verifyBookApp = async (req, res) => {
    try {
        let response = await patientService.postVerifyBookingApp(req.body);
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
    postPatientBookingApp: postPatientBookingApp,
    verifyBookApp: verifyBookApp,

   
}