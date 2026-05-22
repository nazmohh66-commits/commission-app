// ======================================================
// SECTION 1 — IMPORT MONGOOSE
// ======================================================
const mongoose = require("mongoose");


// ======================================================
// SECTION 2 — COMMISSION SCHEMA
// ======================================================
const commissionSchema = new mongoose.Schema({

  salesAmount: {
    type: Number,
    required: true
  },

  commissionPercent: {
    type: Number,
    required: true
  },

  bonus: {
    type: Number,
    default: 0
  },

  tax: {
    type: Number,
    default: 0
  },

  gross: Number,
  taxAmount: Number,
  final: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

});


// ======================================================
// SECTION 3 — EXPORT MODEL
// ======================================================
module.exports = mongoose.model(
  "Commission",
  commissionSchema
);