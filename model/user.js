const pool = require('../config/db');

exports.insert = (data, tbl_name) => {
    return new Promise ((resolve, reject) => {
        let sql = `insert into ${tbl_name} set ?`;
        pool.query(sql, [data], (err) => {
            if (err) reject(err);
            resolve(true);
        });
    });
};

exports.getUserDetailByUsername = (username) => {
    return new Promise ((resolve, reject) => {
        // pilih data u.id, username, name, email. phonenumber 
        // dari gabungan user (u) user_profile (up) pada u.id = up.id
        let sql = `
        select u.id, username, name, email, phonenumber 
        from user u join user_profile up on u.id = up.id
        where u.username = "${username}"
        `;
        pool.query(sql, (err,result) => {
            if (err) reject(err);
            console.log(result);
            resolve (result);
        });
    });
};

exports.getUserDetailByEmail = (email) => {
    return new Promise ((resolve, reject) => {
        // pilih data u.id, username, name, email. phonenumber 
        // dari gabungan user (u) user_profile (up) pada u.id = up.id
        let sql = `
        select u.id, username, name, email, phonenumber 
        from user u join user_profile up on u.id = up.id
        where up.email = "${email}"
        `;
        pool.query(sql, (err,result) => {
            if (err) reject(err);
            console.log(result);
            resolve (result);
        });
    });
};

exports.getUserDetailByUsernameAndPassword = (username,password) => {
    return new Promise ((resolve, reject) => {
        let sql = `
        select u.id, username, name, email, phonenumber 
        from user u join user_profile up on u.id = up.id
        where u.username = "${username}" and u.password = "${password}"
        `;
        pool.query(sql, (err,result) => {
            if (err) reject(err);
            // console.log(result);
            resolve (result);
        });
    });
};


