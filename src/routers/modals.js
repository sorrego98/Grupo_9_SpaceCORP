const express = require("express");
const router = express.Router();

router.get('/:modalName', (req, res) => {
    const modalName = req.params.modalName;
    res.render('partials/modals/admin/' + modalName);
});

module.exports = router;