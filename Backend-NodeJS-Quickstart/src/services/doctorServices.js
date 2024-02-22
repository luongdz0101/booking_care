
import db from "../models/index";
import emailServices from "./emailServices";
var _ = require('lodash');
require('dotenv').config();
const { Op } = require("sequelize")


const MAX_NUMBERS_SCHEDULE = process.env.MAX_NUMBERS_SCHEDULE;



let  getTopDoctorHome= () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {
                        roleID: 'R2'                     
                }, 
                order: [['createdAt','DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi', 'keyMap']},
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']},{
                        model: db.Doctor_info, 
                        attributes: {
                             exclude: ['id', 'doctorId']
                        },
                        include: [
                            { model: db.specialty, as: 'specialtyData', attributes: ['name']},
                        ]
                    }
                   
                ],
                raw: true,
                nest: true
                        
            })
            
            resolve({
                errCode: 0,
                data: doctors
            })
            
                   
        } catch (error) {   
            reject(error)
        }
    })
}


let  getAllDoctor= () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {
                   
                    [Op.or]: [
                        { roleID: 'R2' },
                        { roleID: 'R5' }
                    ]
                }, 
                order: [['createdAt','DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi', 'keyMap']},
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']},{
                        model: db.Doctor_info, 
                        attributes: {
                             exclude: ['id', 'doctorId']
                        },
                        include: [
                            { model: db.specialty, as: 'specialtyData', attributes: ['name']},
                        ]
                    }
                   
                ],
                raw: true,
                nest: true
                        
            })
            
            resolve({
                errCode: 0,
                data: doctors
            })
            
                   
        } catch (error) {   
            reject(error)
        }
    })
}

let  saveInfoDoctor= (inputData) => {

  
    return new Promise(async (resolve, reject) => {
        try {

            if(!inputData.doctorId || !inputData.contentHtml || !inputData.contentMarkdown || !inputData.action ||
                !inputData.selectedPrice || !inputData.selectedProvince || !inputData.selectedPayment || !inputData.addressClinic ||
                !inputData.nameClinic ||  !inputData.note || !inputData.specialtyId
                
                ){
                resolve({
                    errCode: 1,
                    errMessage: 'missing parameter'
                })
            }else{

                if(inputData.action  === 'CREATE'){
                    await db.Markdown.create({
                        contentHtml: inputData.contentHtml,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                        })
                }else if(inputData.action  === 'EDIT'){
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: {doctorId: inputData.doctorId},
                        raw: false
                    })
                    if(doctorMarkdown){
                        doctorMarkdown.contentHtml= inputData.contentHtml;
                        doctorMarkdown.contentMarkdown= inputData.contentMarkdown;
                        doctorMarkdown.description= inputData.description;
                      
                        await doctorMarkdown.save()
                    }
                }
              
            }

            let doctorInfo = await db.Doctor_info.findOne({
                where: {
                    doctorId: inputData.doctorId
                },
                raw:false
            })

            if(doctorInfo){
                doctorInfo.doctorId= inputData.doctorId;
                doctorInfo.priceId = inputData.selectedPrice;
                doctorInfo.provinceId = inputData.selectedProvince;
                doctorInfo.paymentId = inputData.selectedPayment;
                doctorInfo.addressClinic = inputData.addressClinic;
                doctorInfo.nameClinic	= inputData.nameClinic;
                doctorInfo.note = inputData.note;
                doctorInfo.specialtyId = inputData.specialtyId,
                doctorInfo.clinicId = inputData.clinicId
                await doctorInfo.save()
            }else{
                await db.Doctor_info.create({
                    doctorId: inputData.doctorId,
                   priceId : inputData.selectedPrice,
                   provinceId : inputData.selectedProvince,
                   paymentId : inputData.selectedPayment,
                   addressClinic : inputData.addressClinic,
                   nameClinic	: inputData.nameClinic,
                   note : inputData.note,
                   specialtyId: inputData.specialtyId,
                   clinicId: inputData.clinicId,
                })
            }

            resolve({
                errCode: 0,
                errMessage: 'Save info doctor succeed! '
            })
            
                   
        } catch (error) {   
            reject(error)
        }
    })
}




let  getDoctorById= (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!inputId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{
               let data = await db.User.findOne({
                    where: {
                        id:inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Markdown, attributes: ['description', 'contentMarkdown', 'contentHtml']},
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                        { 
                            model: db.Doctor_info, 
                            attributes: {
                                    exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'typePriceData', attributes: ['valueEn', 'valueVi']},
                                { model: db.Allcode, as: 'typeProvinceData', attributes: ['valueEn', 'valueVi']},
                                { model: db.Allcode, as: 'typePaymentData', attributes: ['valueEn', 'valueVi']},

                            
                            ]

                        },
                        
                    ],
                    raw: false,
                    nest:true
                })

                if(data && data.image){
                    data.image =  new Buffer(data.image, 'base64'). toString('binary')
                }
                if(!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
           
        } catch (error) {   
            reject(error)
        }
    })
}

let  saveBulkCreateSchedule= (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.arrSchedule || !data.doctorId || !data.formattedDate){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{
                let schedule = data.arrSchedule;
             
                if(schedule && schedule.length > 0){
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBERS_SCHEDULE
                       return item;
                    })

                   
                }
          
                let existing = await db.Schedule.findAll({
                        where: {doctorId: data.doctorId, date: data.formattedDate},
                        attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                        raw: true,
                   
                })
        

                

              
                let toCreate = _.differenceWith(schedule, existing, (a,b) => {
                    return a.timeType === b.timeType && +a.date === +b.date
                });

         
                
                if(toCreate && toCreate.length > 0){
                    await db.Schedule.bulkCreate(toCreate);
                }
            
             
               
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }
          
        } catch (error) {   
            reject(error)
        }
    })
}

let  getScheduleDate= (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!doctorId || !date){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{
               let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi']},
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName']},
                        
                    ],
                    raw: false,
                    nest:true
                    
                })

  

                if(!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }
           
        } catch (error) {   
            reject(error)
        }
    })
}

let  getProfileDoctorById= (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!inputId ){
                resolve({
            
                     errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{

               
                let data = await db.User.findOne({
                    where: {
                        id:inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        
                        { model: db.Markdown, attributes: ['description', 'contentMarkdown', 'contentHtml']}
                        ,
                        
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                        
            
                        {
                            model: db.Doctor_info, 
                            attributes: {
                                    exclude: ['id', 'doctorId']
                            },
                            include: [
                         
                                { model: db.Allcode, as: 'typeProvinceData', attributes: ['valueEn', 'valueVi']},

                            
                            ]
                        }
                               
                        
                        
                        
                       
                    ],
                    raw: false,
                    nest:true
                })

                if(data && data.image){
                    data.image =  new Buffer(data.image, 'base64'). toString('binary')
                }
                if(!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
           
        } catch (error) {   
            reject(error)
        }
    })
}

let  getListPatient= (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!doctorId || !date){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{
              

               

               
                let data = await db.Booking.findAll({
                    where:{
                        statusId: 'S2',
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        
                        { model: db.User,
                            as:'patientData', attributes: ['email', 'firstName', 'address', 'gender', 'phoneNumber'] ,
                            include: [
                        
                                { model: db.Allcode,
                                    as:'genderData', attributes: ['valueEn', 'valueVi'] 
                                },
                               
                            ]
                                
                        
                        },
                         
                        { model: db.Allcode,
                            as:'timeTypePatient', attributes: ['valueEn', 'valueVi'] ,
                            
                                
                        
                        }

                    ],
                    raw:false,
                    nest: true
                
                })

                resolve({
                    errCode: 0,
                    data: data
                })
                


            }
           
        } catch (error) {   
            reject(error)
        }
    })
}


let  postSendRemedy= (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if(!data.email || !data.doctorId || !data.timeType || !data.patientId){
                resolve({
                    errCode: 1,
                    errMessage: "missing "
                })
            }else{

                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 'S2'
                       
                    },
                    raw: false
                })

                
                if(appointment){
                    appointment.statusId = 'S3'
                    await appointment.save()
                }
                
            }
              
            await emailServices.sendAttachment(data)
            

            resolve({
                errCode: 0,
                errMessage: 'Ok'
            })
            
                   
        } catch (error) {   
            reject(error)
        }
    })
}

let  getExtraInfoById= (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!inputId ){
                resolve({
            
                     errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{

               
                let data = await db.Doctor_info.findOne({
                    where: {
                        doctorId: inputId
                    },
                   
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcode, as: 'typePriceData', attributes: ['valueEn', 'valueVi']},
                        { model: db.Allcode, as: 'typeProvinceData', attributes: ['valueEn', 'valueVi']},
                        { model: db.Allcode, as: 'typePaymentData', attributes: ['valueEn', 'valueVi']},
                
                     
                    ],
                    raw: false,
                    nest:true
                })

                if(!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                })
            }
           
        } catch (error) {   
            reject(error)
        }
    })
}


module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveInfoDoctor: saveInfoDoctor,
    getDoctorById: getDoctorById,
    saveBulkCreateSchedule: saveBulkCreateSchedule,
    getScheduleDate:getScheduleDate,
    getProfileDoctorById: getProfileDoctorById,
    getListPatient: getListPatient,
    postSendRemedy: postSendRemedy,
    getExtraInfoById: getExtraInfoById
   
}