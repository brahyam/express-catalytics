const express = require('express');
const winston = require('winston');
const productService = require('../services/product-service');
const router = express.Router();

/* GET products listing. */
router.get('/', function (req, res, next) {
  productService.find()
    .then(products => {
      winston.debug('GET /products: retrieved ' + products.length + ' products');
      res.render('productList', {products: products});
    })
    .catch(err => {
      res.render('error', {message: 'error listing products:' + err});
    });
});

router.get('/create', function (req, res, next) {
  res.render('createProduct');
});

/**
 * Save a new Product.
 */
router.post('/', function (req, res, next) {
    var product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
    };

    productService.create(product)
        .then(createdProduct => {
            if (createdProduct) {
                res.render('productList', {message: 'product created'});
            }
            else {
                res.render('error', {message: 'product not created'});
            }
        })
        .catch(err => {
            res.render('error', {message: 'error creating product:' + err});
        });
});

router.post('/', function (req, res, next) {

    product.findByIdAndRemove(req.params.productId, function (err, todo) {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        var response = {
            message: "Product successfully deleted",
            id: product._id
        };
        res.send(response);
    });
});

router.get('/edit/:id', function (req, res, next) {
  var productId = req.params.id;
  winston.debug('GET /edit. editing product:' + productId);

    productService.find(productId)
        .then(product => {
            if (product) {
                res.render('productList', {message: 'changes saved'});
            }
            else {
                res.render('error', {message: 'error editing product'});
            }
        })
        .catch(err => {
            res.render('error', {message: 'error editing product:' + err});
        });
});

module.exports = router;
