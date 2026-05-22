// ======================================================
// SECTION 1 — IMPORTS
// ======================================================
const router = require("express").Router();

const Commission = require("../models/Commission");


// ======================================================
// SECTION 2 — CALCULATE COMMISSION
// ======================================================
router.post("/calculate", async (req, res) => {

  try {

    const {
      salesAmount,
      commissionPercent,
      bonus,
      tax
    } = req.body;

    // calculate values
    const gross =
      (salesAmount * commissionPercent) / 100;

    const total = gross + bonus;

    const taxAmount =
      (total * tax) / 100;

    const final = total - taxAmount;

    // save to MongoDB
    const newCommission =
      await Commission.create({
        salesAmount,
        commissionPercent,
        bonus,
        tax,
        gross,
        taxAmount,
        final
      });

    // send response
    res.json({
      msg: "Commission calculated",
      gross,
      total,
      taxAmount,
      final,
      commission: newCommission
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error"
    });

  }

});


// ======================================================
// SECTION 3 — GET HISTORY
// ======================================================
router.get("/history", async (req, res) => {

  try {

    const commissions =
      await Commission.find()
      .sort({ createdAt: -1 });

    res.json(commissions);

  } catch (err) {

    res.status(500).json({
      msg: "Error fetching history"
    });

  }

});


// ======================================================
// ======================================================
// SECTION 4 — DELETE COMMISSION
// ======================================================
router.delete("/:id", async (req, res) => {

  try {

    await Commission.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Commission deleted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Delete failed"
    });

  }

});


// ======================================================
// SECTION 5 — EXPORT
// ======================================================
module.exports = router;