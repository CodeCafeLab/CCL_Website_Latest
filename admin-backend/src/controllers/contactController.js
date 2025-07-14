const ContactUsModel = require('../models/ContactUsModel');

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const contact = { name, email, subject, message };
    const id = await ContactUsModel.create(contact);
    res.status(201).json({ id, ...contact });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await ContactUsModel.getAll();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};