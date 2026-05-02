const express = require("express");
const router = express.Router();
const { getTopNotifications } = require("../services/priorityService");

router.get("/", async (req, res) => {
    try {
        const result = await getTopNotifications(10);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;