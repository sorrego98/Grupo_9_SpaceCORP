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
    res.render('partials/modals/admin/destroy');
});

router.get('/user/:editModal', (req, res) => {
    const editModal = req.params.editModal;
    res.render('partials/modals/user/' + editModal);
});

module.exports = router;