
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { badRequest, unauthorized } = require("../errors/");

const registor = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new badRequest("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new unauthorized("Invalid credentials");
  }
  const isPassword = await user.compare(password);
  if (!isPassword) {
    throw new unauthorized("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  registor,
  login,
};
