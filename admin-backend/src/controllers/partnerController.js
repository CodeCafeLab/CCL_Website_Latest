const PartnerModel = require('../models/partnerModel');

exports.createPartnerRequest = async (req, res) => {
  try {
    const {
      fullName,
      company,
      email,
      phone,
      cityCountry,
      website,
      areaOfInterest,
      productsOfInterest,
      collaborationPlan,
      portfolio
    } = req.body;

    // Basic validation
    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: "Full name, email, and phone are required." });
    }

    // Create partner request object
    const partnerRequest = {
      full_name: fullName,
      company: company || "",
      email,
      phone,
      city_country: cityCountry || "",
      website: website || "",
      area_of_interest: JSON.stringify(areaOfInterest || []),
      products_of_interest: JSON.stringify(productsOfInterest || []),
      collaboration_plan: collaborationPlan || "",
      portfolio: portfolio || ""
    };

    // Save to database
    const id = await PartnerModel.create(partnerRequest);

    res.status(201).json({ 
      message: "Partner request submitted successfully", 
      partnerRequest: { id, ...partnerRequest }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getPartnerRequests = async (req, res) => {
  try {
    const partners = await PartnerModel.getAll();
    console.log('Partners from database:', partners);
    
    // Parse JSON fields
    const parsedPartners = partners.map(partner => {
      try {
        return {
          ...partner,
          areaOfInterest: partner.area_of_interest ? JSON.parse(partner.area_of_interest) : [],
          productsOfInterest: partner.products_of_interest ? JSON.parse(partner.products_of_interest) : []
        };
      } catch (parseError) {
        console.error('Error parsing JSON for partner:', partner, parseError);
        // Return partner with empty arrays if parsing fails
        return {
          ...partner,
          areaOfInterest: [],
          productsOfInterest: []
        };
      }
    });
    
    console.log('Parsed partners:', parsedPartners);
    res.json(parsedPartners);
  } catch (err) {
    console.error('Error in getPartnerRequests:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await PartnerModel.getById(id);
    
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    
    // Parse JSON fields
    try {
      const parsedPartner = {
        ...partner,
        areaOfInterest: partner.area_of_interest ? JSON.parse(partner.area_of_interest) : [],
        productsOfInterest: partner.products_of_interest ? JSON.parse(partner.products_of_interest) : []
      };
      
      console.log('Parsed partner:', parsedPartner);
      res.json(parsedPartner);
    } catch (parseError) {
      console.error('Error parsing JSON for partner:', partner, parseError);
      // Return partner with empty arrays if parsing fails
      const parsedPartner = {
        ...partner,
        areaOfInterest: [],
        productsOfInterest: []
      };
      res.json(parsedPartner);
    }
  } catch (err) {
    console.error('Error in getPartnerById:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
