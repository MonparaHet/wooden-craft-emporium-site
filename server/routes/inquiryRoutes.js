
const express = require('express');
const Inquiry = require('../models/Inquiry');
const { auth, isAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/inquiries
// @desc    Get all inquiries
// @access  Private (Admin only)
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/inquiries
// @desc    Create a new inquiry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, productType, quantity, specifications, message } = req.body;
    
    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      productType,
      quantity,
      specifications,
      message
    });
    
    const inquiry = await newInquiry.save();
    res.status(201).json(inquiry);
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/inquiries/:id/respond
// @desc    Mark inquiry as responded
// @access  Private (Admin only)
router.put('/:id/respond', auth, isAdmin, async (req, res) => {
  try {
    let inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    
    inquiry.responded = true;
    
    inquiry = await inquiry.save();
    res.json(inquiry);
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
