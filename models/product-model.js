'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {type: String},
  description: {type: String},
  price: {type: Number},
  quantity: {type: Number},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
