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
      res.redirect('/products');
    })
    .catch(err => {
      res.render('error', {message: 'error creating product:' + err});
    });
});

/**
 * Deletes a product
 */
router.get('/delete/:id', function (req, res, next) {
  var productId = req.params.id;
  productService.delete(productId)
    .then(product => {
      res.redirect('/products');
    })
    .catch(err => {
      res.render('error', err);
    });
});

/**
 * Shows edit product form
 */
router.get('/edit/:id', function (req, res, next) {
  var productId = req.params.id;
  productService.find({id: productId})
    .then(product => {
      res.render('editProduct', product);
    })
    .catch(err => {
      winston.error(err);
      res.render('error', err);
    })
});

/**
 * Updates a product
 */
router.post('/edit/:id', function (req, res, next) {

});

module.exports = router;
