const quoteModel = require('../models/quoteModel');

exports.createQuote = async (req, res) => {
  try {
    const q = req.body;
    // Map camelCase to snake_case
    const quote = {
      full_name: q.fullName,
      email: q.email,
      company_name: q.companyName,
      service_interest: q.serviceInterest,
      project_description: q.projectDescription,
      budget_range: q.budgetRange,
      preferred_contact_method: q.preferredContactMethod,
      phone_number: q.phoneNumber
    };
    const id = await quoteModel.create(quote);
    res.status(201).json({ id, ...quote });
  } catch (err) {
    console.error('Error creating quote:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await quoteModel.getAll();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
