import { emit } from "nodemon";
import db from "../models/index";
import bcrypt, { compareSync } from "bcryptjs";


let  createNewSpecialty = async(data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.name || !data.image || !data.descriptionHtml || !data.descriptionMarkdown ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{
            
                await db.specialty.create({
                    name: data.name,
                    image: data.image,
                    descriptionHtml: data.descriptionHtml,
                    descriptionMarkdown: data.descriptionMarkdown
                   
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

let  getSpecialtyHome= () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.specialty.findAll({
                
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


let  getDetailSpecialtyById= (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {

            if(!inputId || !location ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{
                
           

                    let data = await db.specialty.findOne({
                        where: {
                            id: inputId
                        },
                        attributes: ['descriptionHtml', 'descriptionMarkdown', 'name', 'image']
                    })

                    

                    if(data){
                        let doctorSpecialty = [];
                        if(location === 'All'){
                            doctorSpecialty = await db.Doctor_info.findAll({
                                where: {
                                    specialtyId: inputId
                                },
                                attributes: ['doctorId', 'provinceId',]
                            })
                        }else{
                            doctorSpecialty = await db.Doctor_info.findAll({
                                where: {
                                    specialtyId: inputId,
                                    provinceId: location
                                },
                                attributes: ['doctorId', 'provinceId']
                            })
                        }
                        
                        data.doctorSpecialty = doctorSpecialty
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



let  saveInfoSpecialty= (inputData) => {

  
    return new Promise(async (resolve, reject) => {
        try {

            if(!inputData.name || !inputData.descriptionMarkdown  || !inputData.descriptionHtml || !inputData.image){
                resolve({
                    errCode: 1,
                    errMessage: 'missing parameter'
                })
            }else{

            
                 
                    if(inputData.action  === 'CREATE'){
                        await db.specialty.create({
                            name: data.name,
                            descriptionMarkdown: data.descriptionMarkdown,
                            descriptionHtml: data.descriptionHtml,
                            image: data.image
                        })
                    }else if(inputData.action  === 'EDIT'){
                        let specialty = await db.specialty.findOne({
                            where: {id: inputData.specialtyId},
                            raw: false
                        })
                        if(specialty){
                            specialty.descriptionMarkdown= inputData.descriptionMarkdown;
                            specialty.descriptionHtml= inputData.descriptionHtml;
                            specialty.image= inputData.image;
                            specialty.name= inputData.name;
                            await specialty.save()
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


let handleDeleteSpecialty = async (specialtyId) => {
    return new Promise( async (resolve, reject) => {
        try{
            let specialty = await db.specialty.findOne({
                where: {id: specialtyId},
                raw: false
             

            });
            
            if(specialty){
                await specialty.destroy();
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
    createNewSpecialty: createNewSpecialty,
    getSpecialtyHome: getSpecialtyHome,
    getDetailSpecialtyById: getDetailSpecialtyById,
    saveInfoSpecialty: saveInfoSpecialty,
    handleDeleteSpecialty: handleDeleteSpecialty
}