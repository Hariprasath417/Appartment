const db = require('../models/index')
const {Flat, House, User} = db;

exports.createFlat = async (req, res) => {
  try {
    const { name } = req.body;

    const validFlats = ['A', 'B'];
    if (!validFlats.includes(name)) {
      return res.status(400).json({ message: 'Invalid flat name. Must be A or B.' });
    }

    const existingflat = await Flat.findOne({ name });
    if(existingflat) {
      return res.status(404).json({message:'Flat already exist'})
    }

    const flat = new Flat({name})
    await flat.save()
    res.status(201).json({ message: 'Flat created successfully', flat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFlats = async (req, res) => {
  try {
    const flats = await Flat.find()
    res.status(200).json(flats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignOwnerTenant = async (req, res) => {
  try {
    const { owner, tenant } = req.body;
    const { houseId } = req.params;

    const house = await House.findById(houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });

    const updateData = {};

    if (owner !== undefined) {
      updateData.owner = owner || null; // set to value or null
    }

    if (tenant !== undefined) {
      updateData.tenant = tenant || null;
    }

    const updated = await House.findByIdAndUpdate(houseId, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHousesByFlat = async (req, res) => {
  try {
    const { flatId } = req.params
    const houses = await House.find({ flat: flatId }).populate('owner tenant');
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.updateOwner = async (req, res) => {
//   try {
//     const { houseId } = req.params;
//     const { name, email, proof } = req.body;

//     const house = await House.findById(houseId);
//     if (!house) return res.status(404).json({ message: 'House not found' });
//     if (house.owner && house.owner.email) return res.status(400).json({ message: 'Owner already assigned to this house' });

//     house.owner = { name, email, proof };
//     await house.save();

//     const user = await User.findOne({ email });
//     if (user) {
//       user.house = house._id;
//       await user.save();
//     }

//     res.status(200).json(house);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateTenant = async (req, res) => {
//   try {
//     const { houseId } = req.params;
//     const { name, email, proof } = req.body;

//     const house = await House.findById(houseId);
//     if (!house) return res.status(404).json({ message: 'House not found' });
//     console.log(req.user.email);
//     console.log(house.owner.email);
//     console.log(house.owner);

    

//     // ✅ Ensure requester is owner of this house
//     if (
//       req.user.role !== 'owner' ||
//       !house.owner ||
//       house.owner.email !== req.user.email
//     ) {
//       return res.status(403).json({ message: 'Only the owner of this house can update tenant details' });
//     }

//     // ✅ Assign tenant
//     house.tenant = { name, email, proof };
//     await house.save();

//     const tenantUser = await User.findOne({ email });
//     if (tenantUser) {
//       tenantUser.house = house._id;
//       await tenantUser.save();
//     }

//     res.status(200).json(house);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };