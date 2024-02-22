import express, { Router } from "express";

import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicsController from "../controllers/clinicsController";
import questionController from "../controllers/questionController"


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);

    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/delete-crud',homeController.deleteCRUD);  
    
    router.post('/api/login', userController.handleLogin);
    router.post('/api/create-new-users', userController.handleCreateNewUsers);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.put('/api/edit-users', userController.handleEditUser);
    router.delete('/api/delete-users', userController.handleDeleteUser);
    router.get('/api/all-code', userController.getAllCode);

    router.get('/api/top-doctor-home',doctorController.getTopDoctorHome);

    router.get('/api/get-all-doctor', doctorController.getAllDoctor);

    router.post('/api/save-info-doctor', doctorController.postInfoDoctor);

    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bilk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-by-date', doctorController.getScheduleByDate);

    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);
    
    router.post('/api/send-remedy', doctorController.sendRemedy);
    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatient);
    router.post('/api/patient-booking-app', patientController.postPatientBookingApp);
    router.post('/api/verify-book-app', patientController.verifyBookApp);

    
    router.get('/api/get-extra-info-by-id', doctorController.getExtraInfoById);

    router.post('/api/create-new-specialty', specialtyController.createNewSpecialty);
    router.get('/api/get-specialty-home', specialtyController.getSpecialtyHome);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);
    router.post('/api/save-info-specialty', specialtyController.saveInfoSpecialty);
    router.delete('/api/delete-specialty', specialtyController.handleDeleteSpecialty);


    router.post('/api/create-new-medical-facilities', clinicsController.createNewMedicalFacilities);
    router.get('/api/get-medical-facilities', clinicsController.getMedicalFacilities);
    router.get('/api/get-medical-facilities-by-id', clinicsController.getMedicalFacilitiesById);
    router.post('/api/save-info-medical-facilities', clinicsController.saveInfoMedicalFacilities);
    router.delete('/api/delete-medical-facilities', clinicsController.deleteMedicalFacilities);


    router.post('/api/create-new-question', questionController.createNewQuestion);
    router.get('/api/get-question', questionController.getQuestion);
    router.post('/api/search', questionController.search);
    router.get('/api/get-question-by-id', questionController.getQuestionById);
    router.get('/api/doctor-info', questionController.getDoctorInfo);
    router.get('/api/get-reply', questionController.getReply);
    router.post('/api/send-question', questionController.sendQuestion);

    // router.post('/api/create-new-patient-question', questionController.createNewPatientQuestion);






    return app.use("/", router);
}

module.exports = initWebRoutes;