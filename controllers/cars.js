const mongoose = require("mongoose");
const Cars = require("../models/cars");
const { StatusCodes } = require("http-status-codes");
const { badRequest, unauthorized, notFound } = require("../errors/");
const { not } = require("joi");

const getAllCars = async (req, res) => {
  const cars = await Cars.find();
  res.status(StatusCodes.OK).json({ cars, count: cars.length });
};
const getCar = async (req, res) => {
  const { id: carsId } = req.params;
  const car = await Cars.findById(carsId);
  if (!car) {
    throw new notFound(`No car with id :${carsId}`);
  }
  res.status(StatusCodes.OK).json({ car });
};
const createCar = async (req, res) => {
  req.body.addedBy = req.user.userId;
  req.body.updatedBy = req.user.userId;
  const car = await Cars.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ car });
};
const deleteCar = async (req, res) => {
  const { id: carsId } = req.params;
  const car = await Cars.findOneAndRemove({ _id: carsId });
  if (!car) {
    throw new notFound(`No car with id :${carsId}`);
  }
  res.status(StatusCodes.OK).json({ car });
};
const updateCar = async (req, res) => {
  const {
    body: { car_name, company, price },
    user: { userId },
    params: { id: carsId },
  } = req;
  req.body.updatedBy = userId
  if (company === "" || car_name === "" || price === "") {
    throw new BadRequestError("Company,Price or Position can`t be empty");
  }
  const car = await Cars.findOneAndUpdate({ _id: carsId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!car) {
    throw new notFound(`No car with id :${carsId}`);
  }
  res.status(StatusCodes.OK).json({ car });
};

module.exports = {
  getAllCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
};
