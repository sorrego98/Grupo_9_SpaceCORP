const path = require("path");
const fs = require("fs");
const db = require("../database/models");
const { validationResult } = require("express-validator");

module.exports = {
    creates: {
        staff: async (req, res) => {
            const errors = validationResult(req);
            const responseData = {}; 

            if (errors.isEmpty()) {
                try {
                    const member = await db.Member.create({
                        name: req.body.memberName,
                        jobName: req.body.memberPosition,
                        image: req.file.filename,
                        instagramName: req.body.memberIG,
                        instagramUrl: req.body.memberIGURL
                    });

                    responseData.status = "success";
                    responseData.message = "Elemento creado con éxito";
                } catch (error) {
                    console.error("Error al crear un miembro:", error);
                    responseData.status = "error";
                    responseData.message = "Error al crear un miembro";
                }
            } else {
                responseData.status = "error";
                responseData.message = "Elemento no pudo ser creado";
                responseData.errors = errors.array();
            }
            res.json(responseData)
        }
    },
    destroy: async (req, res) =>{
        const deleteElement = parseInt(req.body.id)
        const tableToDelete = req.body.table
        let unsyncImage;
        const JSONResponse = {
        success: true,
        data: [],
        errors: [],
        };

        switch(tableToDelete.toLowerCase()){
            case "staff":
                try {
                    const member = await db.Member.findOne({
                        where: { id: deleteElement },
                        attributes: ["image"],
                        });

                    if (!member) {
                        JSONResponse.success = false;
                        JSONResponse.errors.push("No se encontró el miembro a eliminar.");
                    } else {
                        unsyncImage = member.image;
                        const imagePath = path.join(__dirname, "../../public/db-images/home/members", unsyncImage);
                        
                        try{
                            await fs.promises.unlink(imagePath);
                            JSONResponse.data.push({"status": "success", "message": "Imagen eliminada con éxito."});

                        }catch (error){
                            JSONResponse.data.push({"status": "warning", "message": "La imagen de perfil no fue encontrada."});

                        }
                        
                        await db.Member.destroy({ where: { id: deleteElement } });

                        JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});

                    }
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push("El ID " + deleteElement + " no existe en la base.\n" + error.message);
                }

                res.json(JSONResponse);
            
            break;
            case "galería":
                try {
                    const Galery = await db.Galery.findOne({
                        where: { id: deleteElement },
                        attributes: ["image"],
                        });

                    if (!Galery) {
                        JSONResponse.success = false;
                        JSONResponse.errors.push("No se encontró el miembro a eliminar.");
                    } else {
                        unsyncImage = Galery.image;
                        const imagePath = path.join(__dirname, "../../public/db-images/home/galery", unsyncImage);
                        
                        try{
                            await fs.promises.unlink(imagePath);
                            JSONResponse.data.push({"status": "success", "message": "Imagen eliminada con éxito."});

                        }catch (error){
                            JSONResponse.data.push({"status": "warning", "message": "La imagen de perfil no fue encontrada."});

                        }
                        
                        await db.Galery.destroy({ where: { id: deleteElement } });

                        JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});

                    }
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push("El ID " + deleteElement + " no existe en la base.\n" + error.message);
                }

                res.json(JSONResponse);

            break;
            case "producciones":                
                try {
                    await db.Production.destroy({ where: { id: deleteElement } });
                    JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push("El ID " + deleteElement + " no existe en la base.\n" + error.message);
                }
                
                res.json(JSONResponse);

            break;
            case "categorías":    
                try {
                    await db.Category.destroy({ where: { id: deleteElement } });
                    JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push("El ID " + deleteElement + " no existe en la base.\n" + error.message);
                }
                
                res.json(JSONResponse);
                
            break;
            case "subcategorías":             
                try {
                    await db.SubCategory.destroy({ where: { id: deleteElement } });
                    JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push("El ID " + deleteElement + " no existe en la base.\n" + error.message);
                }
                
                res.json(JSONResponse);
                
            break;
            case "productos":   
            try {
                const Product = await db.Products.findOne({
                    where: { id: deleteElement },
                    attributes: ["image"],
                    });

                if (!Product) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push("No se encontró el miembro a eliminar.");
                } else {
                    unsyncImage = Product.image;
                    const imagePath = path.join(__dirname, "../../public/db-images/products/", unsyncImage);
                    
                    try{
                        await fs.promises.unlink(imagePath);
                        JSONResponse.data.push({"status": "success", "message": "Imagen eliminada con éxito."});

                    }catch (error){
                        JSONResponse.data.push({"status": "warning", "message": "La imagen de perfil no fue encontrada."});

                    }
                    
                    await db.Products.destroy({ where: { id: deleteElement } });

                    JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});

                }
            } catch (error) {
                JSONResponse.success = false;
                JSONResponse.errors.push("El ID " + deleteElement + " no existe en la base.\n" + error.message);
            }

            res.json(JSONResponse);

                try {
                    await db.Products.destroy({ where: { id: deleteElement } });
                    JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push("El ID " + deleteElement + " no existe en la base.\n" + error.message);
                }
                
                res.json(JSONResponse);
                
            break;
            case "tipos de precio":          
                try {
                    await db.ProductPrice.destroy({ where: { id: deleteElement } });
                    JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push("El ID " + deleteElement + " no existe en la base.\n" + error.message);
                }
                
                res.json(JSONResponse);

            break;
            case "usuarios":
                
                try {
                    const User = await db.User.findOne({
                        where: { id: deleteElement },
                        attributes: ["imageProfile"],
                        });

                    if (!User) {
                        JSONResponse.success = false;
                        JSONResponse.errors.push("No se encontró el miembro a eliminar.");
                    } else {
                        unsyncImage = User.image;
                        const imagePath = path.join(__dirname, "../../public/db-images/users/", unsyncImage);
                        
                        try{
                            await fs.promises.unlink(imagePath);
                            JSONResponse.data.push({"status": "success", "message": "Imagen eliminada con éxito."});

                        }catch (error){
                            JSONResponse.data.push({"status": "warning", "message": "La imagen de perfil no fue encontrada."});

                        }
                        
                        await db.User.destroy({ where: { id: deleteElement } });

                        JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});

                    }
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push("El ID " + deleteElement + " no existe en la base.\n" + error.message);
                }
                    
                res.json(JSONResponse);

            break;
            case "roles de usuarios":
                try {
                    await db.Roles.destroy({ where: { id: deleteElement } });
                    JSONResponse.data.push({"status": "success", "message": "Registro eliminado con éxito."});
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors.push("El ID " + deleteElement + " no existe en la base.\n" + error.message);
                }
                
                res.json(JSONResponse);

            break;
        }

    },
    updates: {
        staff: async (req, res) => {
            const errors = validationResult(req);
            const JSONResponse = {};
        
            const { id, memberName, memberPosition, memberIG, memberIGURL, memberImage } = req.body;
            const image = req.file ? req.file.filename : memberImage;
            const staff = { name: memberName, jobName: memberPosition, instagramName: memberIG, instagramUrl: memberIGURL, image };
            if (errors.isEmpty()) {
                try {
                    const exist = await db.Member.findByPk(id);

                    if (exist){
                        try{
                            const staffResult = await db.Member.update(staff, { where: { id } });
                            if (staffResult[0] === 0) {
                                JSONResponse.success = true;
                                JSONResponse.data =[{ status: "warning", message: "No realizaste cambios." }];
                            } else {
                                if (req.file) {
                                    unsyncImage = memberImage;
                                    const imagePath = path.join(__dirname, "../../public/db-images/home/members", unsyncImage);
                
                                    try {
                                        await fs.promises.unlink(imagePath);
                                        JSONResponse.data = [{ status: "success", message: "Imagen reemplazada con éxito." }];
                                    } catch (error) {
                                        JSONResponse.data = [{ status: "warning", message: "La imagen anterior, parece no existir." }];
                                    }
                                }
                
                                JSONResponse.data = [{ status: "success", message: "Registro actualizado con éxito." }];
                            }
                        } catch (error) {
                            JSONResponse.success = false;
                            JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                        }
                    }else{
                        JSONResponse.success = false;
                        JSONResponse.data =[{ status: "error", message: "El ID " + id + " parece no existir." }];
                    }
                
                    
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                }

            } else {
                JSONResponse.success = false;
                JSONResponse.errors = errors.array();
            }
            res.json(JSONResponse);
        },
        category: async (req, res) => {
            const errors = validationResult(req);
            const JSONResponse = {};
        
            const { id, categoryName} = req.body;
            const category = { name: categoryName};
            if (errors.isEmpty()) {
                try {
                    const exist = await db.Category.findByPk(id);

                    if (exist){
                        try{
                            const staffResult = await db.Category.update(category, { where: { id } });
                            if (staffResult[0] === 0) {
                                JSONResponse.success = true;
                                JSONResponse.data =[{ status: "warning", message: "No realizaste cambios." }];
                            } else {                                
                                JSONResponse.data = [{ status: "success", message: "Registro actualizado con éxito." }];
                            }
                        } catch (error) {
                            JSONResponse.success = false;
                            JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                        }
                    }else{
                        JSONResponse.success = false;
                        JSONResponse.data =[{ status: "error", message: "El ID " + id + " parece no existir." }];
                    }
                
                    
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                }

            } else {
                JSONResponse.success = false;
                JSONResponse.errors = errors.array();
            }
            console.log(JSONResponse)
            res.json(JSONResponse);
        },
        pricetype: async (req, res) => {
            const errors = validationResult(req);
            const JSONResponse = {};
            const { id, priceTypeName} = req.body;
            const priceType = { name: priceTypeName};
            if (errors.isEmpty()) {
                try {
                    const exist = await db.ProductPrice.findByPk(id);

                    if (exist){
                        try{
                            const staffResult = await db.ProductPrice.update(priceType, { where: { id } });
                            if (staffResult[0] === 0) {
                                JSONResponse.success = true;
                                JSONResponse.data =[{ status: "warning", message: "No realizaste cambios." }];
                            } else {                                
                                JSONResponse.data = [{ status: "success", message: "Registro actualizado con éxito." }];
                            }
                        } catch (error) {
                            JSONResponse.success = false;
                            JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                        }
                    }else{
                        JSONResponse.success = false;
                        JSONResponse.data =[{ status: "error", message: "El ID " + id + " parece no existir." }];
                    }
                
                    
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                }

            } else {
                JSONResponse.success = false;
                JSONResponse.errors = errors.array();
            }
            console.log(JSONResponse)
            res.json(JSONResponse);
        },        
        gallery: async (req, res) => {
            const errors = validationResult(req);
            const JSONResponse = {};
            const { id, galleryImage, galleryName} = req.body;
            const image = req.file ? req.file.filename : galleryImage;
            const gallery = { name: galleryName, image};
            if (errors.isEmpty()) {
                try {
                    const exist = await db.Galery.findByPk(id);

                    if (exist){
                        try{
                            const staffResult = await db.Galery.update(gallery, { where: { id } });
                            if (staffResult[0] === 0) {
                                JSONResponse.success = true;
                                JSONResponse.data =[{ status: "warning", message: "No realizaste cambios." }];
                            } else {                                
                                JSONResponse.data = [{ status: "success", message: "Registro actualizado con éxito." }];
                            }
                        } catch (error) {
                            JSONResponse.success = false;
                            JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                        }
                    }else{
                        JSONResponse.success = false;
                        JSONResponse.data =[{ status: "error", message: "El ID " + id + " parece no existir." }];
                    }
                
                    
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                }

            } else {
                JSONResponse.success = false;
                JSONResponse.errors = errors.array();
            }
            console.log(JSONResponse)
            res.json(JSONResponse);
        },
        productions: async (req, res) => {
            const errors = validationResult(req);
            const JSONResponse = {};
            const { id, productionTitle, productionArtist, productionYTUrl } = req.body;
            const prods = { songTitle: productionTitle, artistName: productionArtist, youtubeUrl: productionYTUrl};
            if (errors.isEmpty()) {
                try {
                    const exist = await db.Production.findByPk(id);

                    if (exist){
                        try{
                            const staffResult = await db.Production.update(prods, { where: { id } });
                            if (staffResult[0] === 0) {
                                JSONResponse.success = true;
                                JSONResponse.data =[{ status: "warning", message: "No realizaste cambios." }];
                            } else {                                
                                JSONResponse.data = [{ status: "success", message: "Registro actualizado con éxito." }];
                            }
                        } catch (error) {
                            JSONResponse.success = false;
                            JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                        }
                    }else{
                        JSONResponse.success = false;
                        JSONResponse.data =[{ status: "error", message: "El ID " + id + " parece no existir." }];
                    }
                
                    
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                }

            } else {
                JSONResponse.success = false;
                JSONResponse.errors = errors.array();
            }
            console.log(JSONResponse)
            res.json(JSONResponse);
        },  
        roles: async (req, res) => {
            const errors = validationResult(req);
            const JSONResponse = {};
            const { id, roleName } = req.body;
            const rol = { roleName};
            if (errors.isEmpty()) {
                try {
                    const exist = await db.Roles.findByPk(id);

                    if (exist){
                        try{
                            const staffResult = await db.Roles.update(rol, { where: { id } });
                            if (staffResult[0] === 0) {
                                JSONResponse.success = true;
                                JSONResponse.data =[{ status: "warning", message: "No realizaste cambios." }];
                            } else {                                
                                JSONResponse.data = [{ status: "success", message: "Registro actualizado con éxito." }];
                            }
                        } catch (error) {
                            JSONResponse.success = false;
                            JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                        }
                    }else{
                        JSONResponse.success = false;
                        JSONResponse.data =[{ status: "error", message: "El ID " + id + " parece no existir." }];
                    }
                
                    
                } catch (error) {
                    JSONResponse.success = false;
                    JSONResponse.errors = ["Error al actualizar el registro: " + error.message];
                }

            } else {
                JSONResponse.success = false;
                JSONResponse.errors = errors.array();
            }
            console.log(JSONResponse)
            res.json(JSONResponse);
        },  
        
    }
};
