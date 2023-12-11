import { emit } from "nodemon";
import db from "../models/index";
import bcrypt, { compareSync } from "bcryptjs";


let  createNewMedicalFacilities = async(data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.name || !data.address  || !data.descriptionMarkdown  || !data.descriptionHtml || !data.image){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{
            
                await db.Clinic.create({
                    name: data.name,
                    address : data.address,
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHtml: data.descriptionHtml,
                    image: data.image
                })


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


let  getMedicalFacilities= () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
                
            })
        

            if(data && data.length > 0){
                    data.map(item => {
                        item.image =  new Buffer(item.image, 'base64').toString('binary')
                        return item;
                    })
            }
            if(!data) data = {}

            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })
            
                   
        } catch (error) {   
            reject(error)
        }
    })
}


let  getMedicalFacilitiesById= (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if(!inputId ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
                }else{
                    let data = await db.Clinic.findOne({
                        where: {
                            id: inputId
                        },
                        attributes: ['descriptionHtml', 'descriptionMarkdown', 'image', 'name', 'address']
                    })

                    if(data) {
                        let doctorClinic = [];
                        
                        doctorClinic = await db.Doctor_info.findAll({
                            where: {
                                clinicId: inputId,
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                        data.doctorClinic = doctorClinic

                    }else data = {}

                    if(data && data.image){
                        data.image =  new Buffer(data.image, 'base64'). toString('binary')
                    }
                    if(!data) data = {};

                    
                    resolve({
                        errMessage: 'ok',
                        errCode: 0,
                        data
                    })
               
                
            }      
        } catch (error) {   
            reject(error)
        }
    })
}

let  saveInfoMedicalFacilities= (inputData) => {

  
    return new Promise(async (resolve, reject) => {
        try {

            if(!inputData.name || !inputData.address  || !inputData.descriptionMarkdown  || !inputData.descriptionHtml || !inputData.image){
                resolve({
                    errCode: 1,
                    errMessage: 'missing parameter'
                })
            }else{

            
                 
                    if(inputData.action  === 'CREATE'){
                        await db.Clinic.create({
                            name: data.name,
                            address : data.address,
                            descriptionMarkdown: data.descriptionMarkdown,
                            descriptionHtml: data.descriptionHtml,
                            image: data.image
                        })
                    }else if(inputData.action  === 'EDIT'){
                        let Clinic = await db.Clinic.findOne({
                            where: {id: inputData.clinicId},
                            raw: false
                        })
                        if(Clinic){
                            Clinic.descriptionMarkdown= inputData.descriptionMarkdown;
                            Clinic.descriptionHtml= inputData.descriptionHtml;
                            Clinic.image= inputData.image;
                            Clinic.name= inputData.name;
                            Clinic.address= inputData.address;
                            await Clinic.save()
                        }
                    }
                    
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


let deleteMedicalFacilities = async (clinicId) => {
    return new Promise( async (resolve, reject) => {
        try{
            let clinic = await db.Clinic.findOne({
                where: {id: clinicId},
                raw: false
             

            });
            
            if(clinic){
                await clinic.destroy();
                resolve({
                    errCode: 0,
                    errMessage: 'Deleted info doctor succeed! '
                })
            }else{
                resolve({
                    errCode: 2,
                    errMessage: 'No data! '
                })
            }
        }catch(error){
            reject(error)
        }
    })
 }
module.exports = {
    createNewMedicalFacilities,
    getMedicalFacilities,
    getMedicalFacilitiesById,
    saveInfoMedicalFacilities,
    deleteMedicalFacilities
    
}