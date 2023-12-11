
import db from "../models/index";
require('dotenv').config();
var _ = require('lodash');
import emailServices from "./emailServices";
import { v4 as uuidv4 } from 'uuid';
const { Op } = require("sequelize")




function buildUrlEmail(doctorId, token) {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
}

let  postPatientBookApp = async(data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName || !data.gender
                || !data.address){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{
               
                let token = uuidv4();
                await emailServices.sendSimpleEmail({
                    receiversEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName:data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId,token)
                });

             

                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        roleID: 'R3',
                        gender: data.gender,
                        firstName: data.fullName,
                        address: data.address,
                        phoneNumber: data.phoneNumber
                    }
                })

                if(user && user[0]){
                    await db.Booking.findOrCreate({

                        where: {
                            patientId: user[0].id
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }


                        

                        
                        
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Post success'
                })

            }
           
              
           
        } catch (error) {   
            reject(error)
        }
    })
}


let  postVerifyBookingApp= async(data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.token || !data.doctorId ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{

                
                let appointment = await db.Booking.findOne({
                    where: {

                        
                        doctorId: data.doctorId,
                        token: data.token,
                        [Op.or]: [
                            { statusId: 'S1' },
                            { statusId: 'S3' }
                          ]
                    }

                
                    ,
                    raw: false
                })




              
                if(appointment){
                    appointment.statusId = 'S2'
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'update the appointment succeed'
                    })

                }else{
                    resolve({
                        errCode: 2,
                        errMessage: 'The account has been activated or does not exist'
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Post success'
                })

            }
           
              
           
        } catch (error) {   
            reject(error)
        }
    })
}







module.exports = {
    postPatientBookApp: postPatientBookApp,
    postVerifyBookingApp: postVerifyBookingApp,
   
   
}