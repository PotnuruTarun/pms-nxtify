const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const inMemoryCompanies = require('../data/companies');
let CompanyModel;
try {
  CompanyModel = require('../models/Company');
} catch (e) {
  CompanyModel = null;
}

// GET /api/companies
// Query params: page, limit, search, location, industry, sort
router.get('/', async (req, res) => {
  try {
    const { search, location, industry, sort, page = 1, limit = 10 } = req.query;

    // If DB is connected and model is available, query MongoDB
    if (mongoose.connection.readyState === 1 && CompanyModel) {
      const query = {};
      if (search) {
        const re = new RegExp(search, 'i');
        query.$or = [{ name: re }, { description: re }];
      }
      if (location) query.location = new RegExp(location, 'i');
      if (industry) query.industry = new RegExp(`^${industry}$`, 'i');

      let mongoQuery = CompanyModel.find(query);

      // Sorting
      if (sort) {
        if (sort === 'name_asc') mongoQuery = mongoQuery.sort({ name: 1 });
        else if (sort === 'name_desc') mongoQuery = mongoQuery.sort({ name: -1 });
        else if (sort === 'employees_asc') mongoQuery = mongoQuery.sort({ employees: 1 });
        else if (sort === 'employees_desc') mongoQuery = mongoQuery.sort({ employees: -1 });
      }

      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const perPage = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
      const total = await CompanyModel.countDocuments(query);
      const pages = Math.ceil(total / perPage);
      const data = await mongoQuery.skip((pageNum - 1) * perPage).limit(perPage).lean();

      return res.json({ data, total, page: pageNum, pages });
    }

    // Fallback to in-memory data
    let results = inMemoryCompanies.slice(); // clone
    if (search) {
      const q = String(search).toLowerCase();
      results = results.filter(c => c.name.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q));
    }
    if (location) {
      const q = String(location).toLowerCase();
      results = results.filter(c => c.location.toLowerCase().includes(q));
    }
    if (industry) {
      const q = String(industry).toLowerCase();
      results = results.filter(c => c.industry.toLowerCase() === q);
    }
    if (sort) {
      if (sort === 'name_asc') results.sort((a, b) => a.name.localeCompare(b.name));
      else if (sort === 'name_desc') results.sort((a, b) => b.name.localeCompare(a.name));
      else if (sort === 'employees_asc') results.sort((a, b) => a.employees - b.employees);
      else if (sort === 'employees_desc') results.sort((a, b) => b.employees - a.employees);
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const perPage = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const total = results.length;
    const pages = Math.ceil(total / perPage);
    const start = (pageNum - 1) * perPage;
    const data = results.slice(start, start + perPage);

    res.json({ data, total, page: pageNum, pages });
  } catch (err) {
    console.error('Error in /api/companies', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/companies/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (mongoose.connection.readyState === 1 && CompanyModel) {
      const company = await CompanyModel.findOne({ id }).lean();
      if (!company) return res.status(404).json({ message: 'Company not found' });
      return res.json(company);
    }

    // fallback
    const company = inMemoryCompanies.find(c => c.id === id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    console.error('Error in /api/companies/:id', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
