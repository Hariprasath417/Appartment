const db = require('../models/index')
const {House} = db;

exports.createHouse = async (req, res) => {
  try {
    const { houseNumber,flatId } = req.body;
    const house = new House({ houseNumber: houseNumber, flat: flatId });
    await house.save();
    res.status(201).json(house);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllHouses = async (req, res) => {
  try {
    const houses = await House.find().populate('owner tenant flat');
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id).populate('owner tenant flat');
    if (!house) return res.status(404).json({ message: 'House not found' });
    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
