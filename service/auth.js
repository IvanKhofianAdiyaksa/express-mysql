const user = require('../model/user');
const md5 = require('md5');
const jwt = require('../config/jwt')

exports.register = async (req,res) => {
    let user_login = {
        username: req.body.username,
        password: md5(req.body.password)
    };

    let user_profile = {
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber
    };

    user.getUserDetailByUsername(req.body.username)
    .then((getUserDetailByUsername) => {
        if (getUserDetailByUsername.length == 0) {
            user.getUserDetailByEmail(req.body.email)
            .then((getUserDetailByEmail) => {
                if(getUserDetailByEmail.length == 0) {
                    user.insert(user_login, 'user')
                    .then(() => {
                        user.insert(user_profile, 'user_profile')
                        .then(() => {
                            res.json({
                                success: true
                            });
                        }).catch(() => {
                            res.json({
                                success: false,
                                message: "Failed to input user data to database"
                            });
                        });
                    }).catch(() => {
                        res.json({
                            success: false,
                            message: "Failed to input user data to database"
                        });
                    });
                }
                else {
                    res.json ({
                        success: false,
                        message: "email has already existed"
                    });
                }
            })
        }
        else {
            res.json ({
                success: false,
                message: "username has already existed"
            });
        }
    })
};

exports.login = async (req,res) => {
    user.getUserDetailByUsernameAndPassword(req.body.username,md5(req.body.password))
    .then((result) => {
        // console.log(result);
        if (result.length > 0) {
            let data = {
                user_id: result[0].id,
                username: result[0].username,
                name: result[0].name,
                email: result[0].email,
                phonenumber: result[0].phonenumber,
            }
            console.log(data);
            const token = jwt.Encode(data);
            
            res.json({
                success: true,
                token
            })
            return;
        }

        res.json({
            success: false,
            message: "username or password is wrong"
        })
    })
}

exports.decodeToken = (req,res) => {
    const decoded_data = jwt.Decode(req.params.token);

    res.json({
        success: true,
        user_detail: decoded_data
    })
};