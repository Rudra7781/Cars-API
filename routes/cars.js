const express = require("express");
const router = express.Router()
const auth = require('../middleware/authentication')

const {
    getAllCars,
    getCar,
    createCar,
    deleteCar,
    updateCar
} = require('../controllers/cars');

router.route('/').get(getAllCars).post(auth,createCar)

router.route('/:id').get(getCar).patch(auth,updateCar).delete(auth,deleteCar)



module.exports = router