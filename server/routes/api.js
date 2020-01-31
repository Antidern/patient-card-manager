const express = require('express');
const router = express.Router();
const PatientCard = require('../models/patient-card.js');
//пути для rest api

//обработка get-запроса для получения данных
router.get('/patient', function (req, res, next) {
    let id = req.query.id ? { id: req.query.id } : null;
    PatientCard.find(id).then((list) => {
        res.send(list);
    }).catch(next);
});
//обработка post-запроса для добавления данных
router.post('/patient', function (req, res, next) {
    PatientCard.create(req.body).then(function (list) {
        res.send(list);
    }).catch(next);
});
//обработка put-запроса для обновления данных
router.put('/patient', function (req, res, next) {
    PatientCard.updateOne({ _id: req.body._id }, { $set: req.body }).then((list) => {
        res.send(list);
    }).catch(next);
});
//обработка delete-запроса для удаления данных
router.delete('/patient', function (req, res, next) {
    PatientCard.deleteOne(req.body).then(function (list) {
        res.send(list);
    }).catch(next);
});

module.exports = router;