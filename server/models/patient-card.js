const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//схемы хранения данных в БД
//необходимы для записи/редактирования/считывания/удаления данных из бд
const PatientCardSchema = new Schema({
   id: {
       type: String,
   },
   height: {
       type: String,
   },
   weight: {
       type: String,
   },
   bloodGroup: {
       type: String,
   },
   rh: {
       type: String,
   },
   publicationDate: {
       type: Date
   }
});

const PatientCard = mongoose.model('patient-card', PatientCardSchema);

module.exports = PatientCard;