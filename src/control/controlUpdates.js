const db = require('../database/models');
const { validationResult } = require('express-validator');

module.exports = {
    creates: {
        staff: async (req, res) => {
            const errors = validationResult(req);
            const responseData = {}; // Cambia "response" a "responseData"

            if (errors.isEmpty()) {
                try {
                    const member = await db.Member.create({
                        name: req.body.memberName,
                        jobName: req.body.memberPosition,
                        image: req.file.filename,
                        instagramName: req.body.memberIG,
                        instagramUrl: req.body.memberIGURL
                    });

                    responseData.status = 'success';
                    responseData.message = 'Elemento creado con éxito';
                } catch (error) {
                    console.error('Error al crear un miembro:', error);
                    responseData.status = 'error';
                    responseData.message = 'Error al crear un miembro';
                }
            } else {
                responseData.status = 'error';
                responseData.message = 'Elemento no pudo ser creado';
                responseData.errors = errors.array();
            }

            req.session.responseData = responseData; // Cambia a "responseData"
            return res.redirect("/admin");
        }
    },
    destroy: async (req, res) =>{
        const deleteElement = parseInt(req.body.id)
        const tableToDelete = req.body.table
        console.log("\n---------------\n" + tableToDelete + "\n---------------\n")
        // switch(tableToDelete.toLowerCase()){
        //     case "staff":
        //         db.Member.destroy(
        //             { where: { id: deleteElement } }
        //         )
        //             .then(() => {
        //                 return res.redirect('/admin')
        //             })
        //             .catch( error =>{
        //                 return res.send({error})
        //             });            
        //     break;
        //     case "galería":
        //         db.Galery.destroy(
        //             { where: { id: deleteElement } }
        //         )
        //             .then(() => {
        //                 return res.redirect('/admin')
        //             })
        //             .catch( error =>{
        //                 return res.send({error})
        //             });            
        //     break;
        //     case "producciones":
        //         db.Production.destroy(
        //             { where: { id: deleteElement } }
        //         )
        //             .then(() => {
        //                 return res.redirect('/admin')
        //             })
        //             .catch( error =>{
        //                 return res.send({error})
        //             }); 
        //     break;
        //     case "categorías":
        //         db.Category.destroy(
        //             { where: { id: deleteElement } }
        //         )
        //             .then(() => {
        //                 return res.redirect('/admin')
        //             })
        //             .catch( error =>{
        //                 return res.send({error})
        //             }); 
        //     break;
        //     case "subcategorías":
        //         db.SubCategory.destroy(
        //             { where: { id: deleteElement } }
        //         )
        //             .then(() => {
        //                 return res.redirect('/admin')
        //             })
        //             .catch( error =>{
        //                 return res.send({error})
        //             }); 
        //     break;
        //     case "productos":
        //         db.Product.destroy(
        //             { where: { id: deleteElement } }
        //         )
        //             .then(() => {
        //                 return res.redirect('/admin')
        //             })
        //             .catch( error =>{
        //                 return res.send({error})
        //             }); 
        //     break;
        //     case "tipos de precio":
        //         db.ProductPrice.destroy(
        //             { where: { id: deleteElement } }
        //         )
        //             .then(() => {
        //                 return res.redirect('/admin')
        //             })
        //             .catch( error =>{
        //                 return res.send({error})
        //             }); 
        //     break;
        //     case "usuarios":
        //         db.User.destroy(
        //             { where: { id: deleteElement } }
        //         )
        //             .then(() => {
        //                 return res.redirect('/admin')
        //             })
        //             .catch( error =>{
        //                 return res.send({error})
        //             }); 
        //     break;
        //     case "roles de usuarios":
        //         db.Role .destroy(
        //             { where: { id: deleteElement } }
        //         )
        //             .then(() => {
        //                 return res.redirect('/admin')
        //             })
        //             .catch( error =>{
        //                 return res.send({error})
        //             }); 
        //     break;
        // }

    },
};
