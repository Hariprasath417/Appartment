const db = require('../models/index')
const {House,Issue} = db;

exports.createIssue = async (req, res) => {
  try {
    const { house, description } = req.body;

    const houseData = await House.findById(house);
    if (!houseData) return res.status(404).json({ message: 'House not found' });
    console.log(req.user.role);
    

    const issue = new Issue({
      description,
      raisedBy: {
        user: req.user.id,
        role: req.user.role
      },
      house,
      status: 'Pending' // optional if you want default to be set always
    });
    
    await issue.save();
    res.status(201).json({ message: 'Issue reported successfully', issue: issue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIssuesByHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    const issues = await Issue.find({ house: houseId })
      .populate('raisedBy.user', 'name email')
      .select('-__v');

    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { issueId } = req.params;
    const issue = await Issue.findById(issueId);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    issue.status = status;
    await issue.save();
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};