const uniqid = require('uniqid');
const products = require('../model/products');
const fs = require('fs');

exports.addProduct = (req, res) => {
    // testing body-parser works properly
    // console.log(req.body);

    let data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };

    if (req.files){
        let file = req.files.product_image;
        let extension = file.name.split('.');
        extension = extension[extension.length - 1];
        let filename = `${uniqid()}.${extension}`;

        file.mv(`./assets/images/${filename}`, function(err){
            if (err) console.log(err);
        })

        data.image_filename = filename;
    }

    products.insert(data)
    .then(() => {
        res.json ({
            success: true
        })
    }).catch(() => {
        res.json({
            success: false,
            message: 'Insert product failed'
        })
    })
    
}

exports.getProduct = (req,res) => {
    products.getProduct(req.params.product_id)
    .then((result) => {
        res.json({
            success: true,
            result
        })
    }).catch(() => {
        res.json({})
    })
}


exports.deleteProduct = (req,res) => {
    products.getProduct(req.params.product_id)
    .then((result) => {
        // console.log(result)
        fs.unlinkSync(`./assets/images/${result[0].image_filename}`)
        products.delete(req.params.product_id)
        .then(() => {
            products.getProduct()
            .then((result) => {
                res.json({
                    success: true,
                    result
                })
            })
        }).catch(() => {
            res.json({
                success: false,
                message: 'Failed to delete products'
            });
        });
    });
};

exports.updateProduct = (req,res) => {
    let data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };

    if (req.files){
        products.getProduct(req.params.product_id)
        .then((result) => {
        // console.log(result)
        fs.unlinkSync(`./assets/images/${result[0].image_filename}`);
        });

        let file = req.files.product_image;
        let extension = file.name.split('.');
        extension = extension[extension.length - 1];
        let filename = `${uniqid()}.${extension}`;

        file.mv(`./assets/images/${filename}`, function(err){
            if (err) console.log(err);
        })

        data.image_filename = filename;
    }
    products.edit(data,req.params.product_id)
    .then(() => {
        res.json({
            success: true
        })
    })
};