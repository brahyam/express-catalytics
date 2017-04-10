//File: controllers/products.js
const mongoose = require('mongoose');
const product = mongoose.model('product');

//GET - Return all products in the DB
exports.findAllProducts = function (req, res) {
    product.find(function (err, products) {
        if (err) res.send(500, err.message);

        console.log('GET /products')
        res.status(200).jsonp(products);
    });
};

//GET - Return a product with specified ID
exports.findById = function (req, res) {
    product.findById(req.params.id, function (err, product) {
        if (err) return res.send(500.
        err.message
        )
        ;

        console.log('GET /product/' + req.params.id);
        res.status(200).jsonp(product);
    });
};

//POST - Insert a new product in the DB
exports.addProduct = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var product = new product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
    });

    product.save(function (err, product) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(product);
    });
};

//PUT - Update a register already exists
exports.updateProduct = function (req, res) {
    product.findById(req.params.id, function (err, product) {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.quantity = req.body.quantity;

        product.save(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(product);
        });
    });
};

//DELETE - Delete a product with specified ID
exports.deleteProduct = function (req, res) {
    product.findById(req.params.id, function (err, product) {
        product.remove(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};