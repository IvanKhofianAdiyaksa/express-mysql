const pool = require('../config/db');

exports.insert = (data) => {
    return new Promise ((resolve, reject) => {
        let sql = 'insert into products set ?';
        pool.query(sql, [data], (err) => {
            if (err) reject(err);
            resolve(true);
        });
    });
};

exports.getProduct = (product_id) => {
    return new Promise ((resolve, reject) => {
        let sql = 'select * from products';
        if (product_id) sql += ` where id = ${product_id}`;
        pool.query(sql, (err,result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

exports.delete = (product_id) => {
    return new Promise ((resolve,reject) => {
        let sql = `delete from products where id = ${product_id}`;
        pool.query(sql, (err) => {
            if (err) reject(err)
            resolve(true)
        });
    });
};

exports.edit = (data, product_id) => {
    return new Promise ((resolve,reject) => {
        let sql = `update products set ? where id = ${product_id}`
        pool.query(sql, [data], (err) => {
            if (err) reject(err);
            resolve(true)
        })
    })
}