const express = require('express');
const winston = require('winston');
const productService = require('../services/product-service');
const router = express.Router();

/* GET products listing. */
router.get('/', function (req, res, next) {
  res.render('productList');
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

module.exports = router;
