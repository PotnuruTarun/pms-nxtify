const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    industry: { type: String, required: true },
    employees: { type: Number, required: true },
    description: String
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
