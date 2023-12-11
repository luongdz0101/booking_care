import { emit } from "nodemon";
import db from "../models/index";
import bcrypt, { compareSync } from "bcryptjs";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


let handUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {} ;
            let isExist = await checkUserEmail(email);
            if(isExist){ 
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['id','email', 'roleID', 'password', 'firstName', 'lastName'],
                    raw: true,
                });
                if(user){
                    
                
                    let check =  await bcrypt.compareSync(password, user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'Ok',
                     
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = 'Plz try other password';
                }
                
            }else{
                userData.errCode = 1;
                userData.errMessage = 'Plz try other email';
            }
            resolve(userData);
            } catch (error) {   
            reject(error)
        }
    })
}


let checkUserEmail = (userEmail) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if(userId === 'ALL'){
                users =  await db.User.findAll({
                    attributes:{
                        exclude: ['password'],
                        raw: true
                    }
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude: ['password'],
                        raw: true
                    }
                })
            }
            resolve(users);
         
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser =  (data) => {
    return new Promise ( async (resolve, reject) => {
        try{
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, Plz try another email!!'
                });
            }else{
                let hashPassWordFromB = await hashUserPassWord(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassWordFromB, 
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleID: data.roleID,
                    phoneNumber: data.phoneNumber ,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            }
            


        }catch(e){
            reject(e)
        }
    })
 
}

let hashUserPassWord = (password) => {
    return new Promise( async (resolve, reject) => {
        try{
            const myPlaintextPassWord = password;
            const hash =  bcrypt.hashSync(myPlaintextPassWord, salt);

            resolve(hash);

        }catch(e){
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise( async (resolve, reject) => {
        try{
            if(!data.id || !data.roleID || !data.positionId || !data.gender){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                })
            }
           
            let user = await db.User.findOne({
                where: {id: data.id},
                raw: false
            });
            if(user){ 
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleID = data.roleID,
                user.positionId = data.positionId,
                user.gender = data.gender,
                user.phoneNumber = data.phoneNumber
                if(data.avatar){
                    user.image = data.avatar
                }
               

                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update the user succeeds'
                });
            }else{
                resolve({
                    errCode: 1,
                    errMessage: 'Update the user succeeds'
                });
            }

        }catch(e){
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise( async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId}
            })

            if(!user){
                resolve({
                    errCode: 2,
                    errMessage: 'The user is not exit!'

                })
            }
           await db.User.destroy({
                where: {id: userId}
           })
            resolve({
                errCode: 0,
                errMessage: 'The user is deleted!'
            })

        }catch(e){
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise( async (resolve, reject) => {
        try{
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                });
                
            }else{
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: {type : typeInput}
                });
    
                res.errCode = 0;
                res.data = allcode;
                resolve(res)
            }
           
           

        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    handUserLogin: handUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService
}