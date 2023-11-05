const express = require("express");
const router = express.Router();

router.get('/:modalName', (req, res) => {
    const modalName = req.params.modalName;
    res.render('partials/modals/admin/' + modalName);
});
router.get('/show/:modalName', (req, res) => {
    const modalName = req.params.modalName;
    res.render('partials/modals/admin/shows/' + modalName);
});
router.get('/destroy', (req, res) => {
    const modalName = req.params.modalName;
    res.render('partials/modals/admin/destroy');
});

module.exports = router;