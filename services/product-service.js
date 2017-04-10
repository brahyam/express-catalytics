'use strict';
const ProductModel = require('../models/product-model');
const mongoDb = require('mongodb');
const winston = require('winston');

class ProductService {

  create(product) {
    return new Promise(
      function (resolve, reject) {
        var newProduct = new ProductModel({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity
        });

        newProduct.save(function (err, createdProduct) {
          if (err) {
            // Failed to save
            reject(err);
          }
          else {
            resolve(createdProduct);
          }
        });
      }
    )
  }

  find(query) {
    return new Promise(
      function (resolve, reject) {

        var newQuery;
        if (!query) {
          newQuery = {};
        }
        else {
          newQuery = query;
        }

        ProductModel.find(newQuery, function (err, products) {
          if (err) {
            reject(err);
          }
          else {
            resolve(products);
          }
        });
      }
    )
  }
}

module.exports = new ProductService();