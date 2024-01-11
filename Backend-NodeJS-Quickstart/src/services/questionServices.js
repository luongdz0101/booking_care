
import db from "../models/index";
const { Op } = require("sequelize")


let  createNewQuestion = async(data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.name ||  !data.image || !data.descriptionHtml ||  !data.descriptionMarkdown ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{
            
                await db.question.create({
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

let  getQuestion= () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.question.findAll({
              
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

let  search = async(searchTerm) => {
    return new Promise(async (resolve, reject) => {
        try {

            if(!searchTerm  ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            } else{

                let data = [];
                if(searchTerm === 'All'){
                    data = await db.specialty.findAll({
                        
                        attributes: {
                            exclude: [ 'descriptionHtml', 'descriptionMarkdown'],
                        }
                    })
                }else{
                    data = await db.specialty.findAll({
                        where: {
                            [Op.or]: [
                                { name : { [Op.like]:  '%' + searchTerm + '%'} },
                                
                              ],
                        },
    
                        attributes: {
                            exclude: [ 'descriptionHtml', 'descriptionMarkdown'],
                        }
                    
                    })

               


                   
                }
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
                    data:data
                })
            }
           
        

            
            
                   
        } catch (error) {   
            reject(error)
        }
    })
}



let  getQuestionById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            if(!id  ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }else{
        
                    let data = await db.question.findOne({
                        where: {
                            id: id
                        },
                        attributes: ['descriptionHtml', 'descriptionMarkdown', 'name', 'image']
                    })

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



let  getDoctorInfo= () => {
    return new Promise(async (resolve, reject) => {
        try {   
                let data = await db.User.findAll({
                    attributes: {
                        exclude: ['id', 'doctorId', , 'image']
                    },
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi', 'keyMap']},
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']},{
                            model: db.Doctor_info, 
                            attributes: {
                                exclude: ['id', 'image']
                            },
                            include: [
                                { model: db.specialty, as: 'specialtyData', attributes: ['name']},
                            ]
                        }
                       
                    ],
                    raw: true,
                    nest:true
                })

                if(!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                })
            
           
        } catch (error) {   
            reject(error)
        }
    })
}

module.exports = {
    createNewQuestion: createNewQuestion,
    getQuestion: getQuestion,
    search: search,
    getQuestionById: getQuestionById,
    getDoctorInfo: getDoctorInfo
}