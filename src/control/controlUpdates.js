const path = require('path');
const fs = require('fs');
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
        switch(tableToDelete.toLowerCase()){
            case "staff":
                let unsyncImage;
                const JSONResponse = {
                success: true,
                data: [],
                errors: [],
                };

                try {
                    const member = await db.Member.findOne({
                        where: { id: deleteElement },
                        attributes: ['image'],
                        });

                    if (!member) {
                        JSONResponse.success = false;
                        JSONResponse.errors.push('No se encontró el miembro a eliminar.');
                        } else {
                        unsyncImage = member.image;
                        const imagePath = path.join(__dirname, '../../public/db-images/home/members', unsyncImage);
    
                        await fs.promises.unlink(imagePath);

                        JSONResponse.data.push({"status": "success", "message": "Imagen eliminada con éxito."});

                        await db.Member.destroy({ where: { id: deleteElement } });

                        JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});
                        }
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push('Error al intentar eliminar el registro:\n' + error.message);
                }

                res.json(JSONResponse);
            
            break;
            
            case "galería":
                db.Galery.destroy(
                    { where: { id: deleteElement } }
                )
                    .then(() => {
                        return res.redirect('/admin')
                    })
                    .catch( error =>{
                        return res.send({error})
                    });            
            break;
            case "producciones":
                db.Production.destroy(
                    { where: { id: deleteElement } }
                )
                    .then(() => {
                        return res.redirect('/admin')
                    })
                    .catch( error =>{
                        return res.send({error})
                    }); 
            break;
            case "categorías":
                db.Category.destroy(
                    { where: { id: deleteElement } }
                )
                    .then(() => {
                        return res.redirect('/admin')
                    })
                    .catch( error =>{
                        return res.send({error})
                    }); 
            break;
            case "subcategorías":
                db.SubCategory.destroy(
                    { where: { id: deleteElement } }
                )
                    .then(() => {
                        return res.redirect('/admin')
                    })
                    .catch( error =>{
                        return res.send({error})
                    }); 
            break;
            case "productos":
                db.Products.destroy(
                    { where: { id: deleteElement } }
                )
                    .then(() => {
                        return res.redirect('/admin')
                    })
                    .catch( error =>{
                        return res.send({error})
                    }); 
            break;
            case "tipos de precio":
                db.ProductPrice.destroy(
                    { where: { id: deleteElement } }
                )
                    .then(() => {
                        return res.redirect('/admin')
                    })
                    .catch( error =>{
                        return res.send({error})
                    }); 
            break;
            case "usuarios":
                db.User.destroy(
                    { where: { id: deleteElement } }
                )
                    .then(() => {
                        return res.redirect('/admin')
                    })
                    .catch( error =>{
                        return res.send({error})
                    }); 
            break;
            case "roles de usuarios":
                db.Role.destroy(
                    { where: { id: deleteElement } }
                )
                    .then(() => {
                        return res.redirect('/admin')
                    })
                    .catch( error =>{
                        return res.send({error})
                    }); 
            break;
        }

    },
};
