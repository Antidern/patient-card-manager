const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/api');
//указываем папку со статичной страницей сайта
const mainPage = express.static('../client/build');

const app = express();
//подключаемся к базе данных
//логин и пароль в url, но это плохое решение со стороны безопасности, 
//в идеале, их нужно хранить в отдельном от репозитория файле
mongoose.connect('mongodb+srv://antidern:0gbf@examination-user-card-hpkvx.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

//ловим событие подключения к БД
mongoose.connection.once('open', function () {
    console.log('connetion has been made, now make fireworks...');
}).on('error', function (error) {
    console.log('Connection error:', error);
});
//устанавливаем cors-политику сервера
app.use(cors());
//устанавливаем статичную страничку в качестве главной страницы сайта
app.use(mainPage);
//нужен для обработки запросов с json
app.use(bodyParser.json());

//указываем пути для обращения к api
app.use('/api', routes);
//все остальные пути будут вести на главную страницу
app.use('/*', mainPage);
//логирование ошибок в консоли сервера
app.use(function (err, req, res, next) {
    res.status(422).send({ error: err._message });
});
//запускаем сервер на указано порте
app.listen(process.env.port || 4000, function () {
    console.log('Now listening for requests');
});