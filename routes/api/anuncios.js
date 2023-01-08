'use strict';

const connectMongoose = require('../../lib/connectMongoose');
const express = require('express');
const createError = require('http-errors');
const Anuncio = require('../../models/Anuncio');

const router = express.Router();

// GET /api/anuncios
router.get('/', async (req, res, next) => {
  try {
    const name = req.query.name;
    const sale = req.query.sale;
    const price = parseInt(req.query.price);
    const photo = req.query.photo;
    const tags = req.query.tags;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;
    const filtro = {};

    if (name) { 
      filtro.name = name;
    };
    if (sale) { 
      filtro.sale = sale;
    };
    if (price) { 
        filtro.price = price;
      };
    if (tags) { 
      filtro.tags = tags;
    };
    const anuncios = await Anuncio.lista(filtro, skip, limit, fields, sort);
    res.json({ results: anuncios });
  } catch(err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const anuncio = await Anuncio.findById(id);
    res.json({ result: anuncio });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const anuncioData = req.body;
    const anuncioActualizado = await Anuncio.findOneAndUpdate({ _id: id}, anuncioData, {
      new: true 
    });
    res.json({ result: anuncioActualizado });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const anuncioData = req.body;
    const anuncio = new Anuncio(anuncioData);
    const anuncioGuardado = await anuncio.save();
    res.json({ result: anuncioGuardado });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const anuncio = await Anuncio.findById(id);
    if (!anuncio) {
      return next(createError(404));
    }
    await Anuncio.deleteOne({ _id: id });
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
