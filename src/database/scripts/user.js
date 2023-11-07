const {Sequelize, op} = require('sequelize')
const db = require('../models');
const Op = db.Sequelize.Op;

const User = db.Users
const Roles = db.Roles

module.exports = dbUser = {
    findUser : {
        byPk: id => {
            return new Promise( (resolve, reject) => {
            User.findByPk(id,{
                include: [{association: 'roles'}]})
                .then((user) => {
                    if (user){
                        resolve({user});
    
                    }else{
                        reject({
                            error: "usuario no encontrado.",
                            user: null
                        })                    
                    }
                })
                .catch(error =>{
                    reject({
                        error,
                        user: null
                    })
                })
            })
        },

        toLogin: data => {
            return new Promise( (resolve, reject) => {
                User.findOne({
                    include: [{association: 'roles'}],
                    where:{
                        [Op.or]: [{email: data}, {userName: data}]}
                  })
                    .then((user) => {
                        if (user){
                            resolve({user});
    
                        }else{
                            reject([{
                                type: "error",
                                field:"email o Nombre de Usuario",
                                msg:"usuario y/o contraseña no válidos."  
                            }])
                            
                        }
                    })
                    .catch(error => reject({error}))
            })        
        },

        ifEmailRegistered: email => {
            return new Promise( (resolve, reject) => {
                User.findOne({
                    where:{email}
                  })
                    .then( user => {
                        if (user){
                            reject([{
                                type: "warning",
                                field:"Email",
                                msg:"el dato ingresado no es válido."}]);
    
                        }else{
                            resolve();
                            
                        }
                    })
                    .catch(error =>{
                        reject({
                            error
                        })
                    })
            })        
        },

        ifUserNameRegistered: userName => {
            return new Promise( (resolve, reject) => {
                User.findOne({
                    where:{userName}
                  })
                    .then( user => {
                        console.log(user)
                        if (user){
                            reject([{
                                type: "error",
                                field:"Nombre de Usuario",
                                msg:"Nombre de usuario " + userName + "ya se encuentra en uso."}]);
    
                        }else{
                            resolve()
                            
                        }
                    })
                    .catch(error =>{
                        reject({
                            error
                        })
                    })
            })        
        },
    },

    updateUserData: (id, data, compare) => {
        return new Promise( (resolve, reject) => {

            if (data.firstName !== compare.firstName ||
                data.lastName !== compare.lastName ||
                data.imageProfile !== compare.imageProfile){
                    User.update(data,{                
                        where:{id}
                        })
                        
                        .then(() => {
                            resolve()
                            })
                        .catch(error =>{
                            reject({error})
                        })                    
            }else{
                resolve()
            }
        })
        
    },

    newUser: newUser => {
        return new Promise( (resolve, reject) => {
            User.create(newUser)
            .then(() => resolve([{
                type: "success",
                field:"",
                msg:"usuario creado satisfactoriamente."}]))
            .catch( () => reject([{
                type: "error",
                field:"Crear usuario",
                msg:"usuario no pudo ser creado."}]))
        })
    }


};