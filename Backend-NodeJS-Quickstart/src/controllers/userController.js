import userService from "../services/userServices"

let handleLogin = async(rep, res) => {
    let email = rep.body.email;
    let password = rep.body.password;
    
    if(!email || !password){
        return res.status(500).json({
           errCode: 1,
           message: 'Missing inputs parameter',

        })
    }

    let userData = await userService.handUserLogin(email, password)


    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async(rep, res) => {
    let id = rep.query.id;

    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUsers = async (rep,res) =>{
    let message = await userService.createNewUser(rep.body);
    return res.status(200).json({
        message: message
    })
}

let handleEditUser = async (rep, res) => {
    let data = rep.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (rep, res) => {
    if(!rep.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        });
    }
    let message = await userService.deleteUser(rep.body.id);
    return res.status(200).json(message);

}



let getAllCode = async(req,res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
       
        return res.status(200).json(data)
        
    } catch (error) {
        console.log(e);
        return res.status(200).json({
            errCode: '1',
            errMessage: 'Error form server'
        })
    }
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUsers: handleCreateNewUsers,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode:getAllCode,
}