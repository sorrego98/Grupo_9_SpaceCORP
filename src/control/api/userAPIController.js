const path = require("path");
const fs = require("fs");
const db = require('../../database/models')
const dbUser = require('../../database/scripts/user');

const userAPIController = {
 
    'list': (req, res) => {
        //return res.json("hola")
         db.Users
         .findAll()
         .then(users => {
            let data = [];
            for (let i = 0; i < users.length; i++) {
                data.push({
                    id:users[i].id, 
                    name:users[i].firstName, 
                    email:users[i].email, 
                    detail:'http://localhost:5050/api/users/'+ users[i].id, 
                    });    
            }
        
            return res.json({
                total: users.length,
                data: data,
                status: 200

            })           
        })
    },

    'detail': (req, res) => {
        //return res.json("hola")
        db.Users
        .findByPk(req.params.id) 
        .then(user => {
            return res.json({
                data: {
                    name: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    email: user.email,
                    imageProfile: 'http://localhost:5050/db-images/users/'+ user.imageProfile,
                    },
                status: 200
            })
        })
    }
}

module.exports = userAPIController;