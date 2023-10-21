const {Sequelize, op} = require('sequelize')
const db = require('../models');
const Op = db.Sequelize.Op;

const User = db.Users
const Roles = db.Roles

module.exports = dbUser = {
    findUser : {
        byPk: (id) => {
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

        toLogin: (data) => {
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
                            reject([{msg:"usuario y/o contraseña inválidos."  
                            }])
                            
                        }
                    })
                    .catch(error =>{
                        reject({
                            error
                        })
                    })
            })        
        },

        existEmail: (email) => {
            return new Promise( (resolve, reject) => {
                User.findOne({
                    where:{email}
                  })
                    .then( user => {
                        if (user){
                            reject();
    
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

        existUserName: (userName) => {
            return new Promise( (resolve, reject) => {
                User.findOne({
                    where:{userName}
                  })
                    .then( user => {
                        console.log(user)
                        if (user){
                            reject();
    
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

};