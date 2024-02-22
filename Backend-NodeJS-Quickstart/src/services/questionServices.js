
import db from "../models/index";
const { Op } = require("sequelize")
import emailServices from "./emailServices";


let  createNewQuestion = async(data) => {
    return new Promise(async (resolve, reject) => {
        if(!data.email ||  !data.fullName || !data.address ||  !data.phoneNumber ||  !data.question ){
            resolve({
                errCode: 1,
                errMessage: 'Missing Parameter'
            })
        }else{
        
            await db.question.create({
                fullName: data.fullName,
                email: data.email,
                address: data.address,
                phoneNumber: data.phoneNumber,
                question: data.question   ,
                image: data.image                
            })

            resolve({
                errCode: 0,
                errMessage: 'Post success'
            })
        }
    })
}

let  getQuestion = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.question.findAll({
                where: {
                    reply: null
                }
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

let  getReply = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.question.findAll({
                where: {
                    reply: {
                        [Op.not]: null,
                    }
                }
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

let  sendQuestion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if(!data.email ){
                resolve({
                    errCode: 1,
                    errMessage: "missing "
                })
            }else{

                let sendReply = await db.question.findOne({
                    where: {
                        email: data.email,
                        fullName: data.fullName,
                        
                       
                    },
                    raw: false
                })

                
                console.log(sendReply);
                
                if(sendReply){
                    sendReply.reply = data.reply
                    sendReply.image = data.image
                    await sendReply.save()
                }
                
            }
              
            // await emailServices.sendReply(data)
            

            resolve({
                errCode: 0,
                errMessage: 'Ok',
                
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
    getDoctorInfo: getDoctorInfo,
    sendQuestion: sendQuestion,
    getReply: getReply
    
}