const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// POST: Add New Member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, role, email, regNumber, degreeStream, hobbies } = req.body;
    const image = req.file ? req.file.filename : '';

    const newMember = new Member({
      name,
      role,
      email,
      regNumber,
      degreeStream,
      hobbies,
      image
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ error: 'Server error while adding member' });
  }
});

// GET: All Members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching members' });
  }
});

// GET: Member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching member details' });
  }
});

module.exports = router;
