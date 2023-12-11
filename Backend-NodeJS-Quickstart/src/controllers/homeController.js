import db from '../models/index';
import CRUDServices from '../services/CRUDServices';



let getHomePage = async (req, res) => {
    try{
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        });
    }catch(e){
        console.log(e)
    }
    
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message =await CRUDServices.createNewUser(req.body);

    console.log (message);
    return res.send('post');
}


let displayGetCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUser();
    
    return res.render('display-crud.ejs', {
        dataTable: data,
    });
}

let getEditCRUD = async (req, res) => {
    let userId =  req.query.id;
    if(userId){
        let userData = await CRUDServices.getUserInfoId(userId);
        // console.log(userData);
        return res.render('editCRUD.ejs', {
            user: userData
        });
       
    }else{
        return res.send('error id');
    }
    
    
} 


let putCRUD = async(rep, res) => {
    let data = rep.body;
    await CRUDServices.updateUserData(data);
    return res.send('update done!');
    
}

let deleteCRUD = async(rep,res) => {
    let id = rep.query.id;
    if(id){
        await CRUDServices.deleteUserData(id);

        return res.send('Deleted Successfully Done!')
    }else{
        return res.send('Deletion failed Done!')
    }
    
    
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD : getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}
