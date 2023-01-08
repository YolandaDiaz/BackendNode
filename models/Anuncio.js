'use strict';

const mongoose = require('mongoose');

const anuncioSchema = new mongoose.Schema({
  name: {type: String, required: true, index: true},
  sale: {type: Boolean, required: true, index: true},
  price: {type: Number, required: true, min: 0, index: true},
  photo: {type: String, required: true},
  tags: {type: [String], required: true, index: true}
});

anuncioSchema.statics.lista = function(filtro, skip, limit, fields, sort) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec()
};

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;