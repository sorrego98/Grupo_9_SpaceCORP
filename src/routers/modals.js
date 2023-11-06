const express = require("express");
const router = express.Router();
const validateCreations = require('../middlewares/crud/validateCreations');
const {uploadUser, uploadProduct , uploadMember , uploadGalery} = require('../middlewares/multerMiddleware');
const controlUpdate = require('../control/controlUpdates');

/* ----------- SHOWS ----------- */
router.get('/:modalName', (req, res) => {
    const modalName = req.params.modalName;
    res.render('partials/modals/admin/' + modalName);
});
router.get('/show/:modalName', (req, res) => {
    const modalName = req.params.modalName;
    res.render('partials/modals/admin/shows/' + modalName);
});
router.get('/edit/:modalName', (req, res) => {
    const modalName = req.params.modalName;
    res.render('partials/modals/admin/edits/' + modalName);
});

router.get('/user/:editModal', (req, res) => {
    const editModal = req.params.editModal;
    res.render('partials/modals/user/' + editModal);
});

router.get('/destroy', (req, res) => {
res.render('partials/modals/admin/destroy');
});

/* ----------- DELETES ----------- */
router.post("/destroy", controlUpdate.destroy);

/* ----------- CREATES ----------- */
router.post("/create/staff", uploadMember.single('imageMember'), validateCreations, controlUpdate.creates.staff);

/* ----------- UPDATES ----------- */
router.put("/edition/categorias", controlUpdate.updates.category); 
router.put("/edition/galeria", uploadGalery.single('galleryNewImage'), controlUpdate.updates.gallery); 
router.put("/edition/precios", controlUpdate.updates.pricetype); 
// router.put("/edition/productos", uploadProduct.single('productImage'), controlUpdate.updates.product); 
router.put("/edition/producciones", controlUpdate.updates.productions); 
router.put("/edition/roles", controlUpdate.updates.roles); 
router.put("/edition/staff", uploadMember.single('memberNewImage'), controlUpdate.updates.staff); 
// router.put("/edition/subcats", controlUpdate.updates.subcategory); 
// router.put("/edition/users", uploadUser.single('userNewImage'), controlUpdate.updates.user); 

module.exports = router;