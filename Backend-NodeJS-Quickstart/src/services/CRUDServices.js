import bcrypt from 'bcryptjs';
import db from '../models/index';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);





let createNewUser = async (data) => {
    
    return new Promise ( async (resolve, reject) => {
        try{
            let hashPassWordFromB = await hashUserPassWord(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassWordFromB, 
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender,
                roleID: data.roleID,
                phoneNumber: data.phoneNumber,
               
            })
            resolve('ok');
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

let getAllUser = async (data) => {
    return new Promise( async (resolve, reject) => {
        try{
           let user = db.User.findAll({
                raw: true
           })
            resolve(user)
        }catch(e){
            reject(e);
        }
    })
}

let getUserInfoId = (userId) => {
    return new Promise( async (resolve, reject) => {
        try{
           let user = db.User.findOne({
                where: {
                    id: userId
                },
                raw: true,
           });
           if(user){
            resolve(user);
           }else{
            resolve({});
           }
        }catch(e){
            reject(e);
        }
    })
}

 let updateUserData = async (data) => {
    return new Promise( async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: data.id}
            });
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                resolve();
            }else{
                resolve();
            }
        }catch(e){
            console.log(e)
        }
    })
 }

 let deleteUserData = async (userId) => {
    return new Promise( async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId}
            });
            
            if(user){
                await user.destroy();
                resolve();
            }else{
                resolve();
            }
        }catch(e){
            console.log(e)
        }
    })
 }
module.exports = {
    createNewUser : createNewUser,
    getAllUser : getAllUser,
    getUserInfoId:getUserInfoId,
    updateUserData: updateUserData,
    deleteUserData: deleteUserData,
}